module StudyCircle::LearningPlatform {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// Struct representing a user's learning profile with credits and badges
    struct LearnerProfile has store, key {
        learning_credits: u64,      // On-chain learning credits earned
        badges_earned: u64,         // Number of verified badges/credentials
        total_sessions: u64,        // Total peer learning sessions participated
        credits_spent: u64,         // Total credits spent on tutoring
        premium_access: bool,       // Premium content access status
    }

    /// Struct representing tutor booking and payment system
    struct TutorBooking has store, key {
        tutor_address: address,     // Verified tutor's address
        session_cost: u64,          // Cost in APT tokens via escrow
        credits_required: u64,      // Learning credits needed for booking
        total_bookings: u64,        // Total successful bookings
        earnings: u64,              // Total earnings from tutoring
    }

    /// Function to participate in peer learning sessions and earn credits & badges
    public fun participate_and_earn_credits(
        learner: &signer,
        sessions_completed: u64,
        badges_earned: u64
    ) acquires LearnerProfile {
        let learner_addr = signer::address_of(learner);
        
        // Create or update learner profile
        if (!exists<LearnerProfile>(learner_addr)) {
            let profile = LearnerProfile {
                learning_credits: sessions_completed * 10, // 10 credits per session
                badges_earned,
                total_sessions: sessions_completed,
                credits_spent: 0,
                premium_access: badges_earned >= 5, // Premium access with 5+ badges
            };
            move_to(learner, profile);
        } else {
            let profile = borrow_global_mut<LearnerProfile>(learner_addr);
            profile.learning_credits = profile.learning_credits + (sessions_completed * 10);
            profile.badges_earned = profile.badges_earned + badges_earned;
            profile.total_sessions = profile.total_sessions + sessions_completed;
            profile.premium_access = profile.badges_earned >= 5;
        }
    }

    /// Function to book tutor via Aptos escrow payment and use learning credits
    public fun book_tutor_with_credits(
        student: &signer,
        tutor_address: address,
        escrow_payment: u64,
        credits_to_use: u64
    ) acquires LearnerProfile {
        let student_addr = signer::address_of(student);
        let student_profile = borrow_global_mut<LearnerProfile>(student_addr);
        
        // Verify student has enough credits
        assert!(student_profile.learning_credits >= credits_to_use, 1);
        
        // Transfer APT tokens via escrow to tutor
        let payment = coin::withdraw<AptosCoin>(student, escrow_payment);
        coin::deposit<AptosCoin>(tutor_address, payment);
        
        // Deduct credits and update profile
        student_profile.credits_spent = student_profile.credits_spent + credits_to_use;
        student_profile.learning_credits = student_profile.learning_credits - credits_to_use;
        
        // Create tutor booking record under student's account
        let booking = TutorBooking {
            tutor_address,
            session_cost: escrow_payment,
            credits_required: credits_to_use,
            total_bookings: 1,
            earnings: escrow_payment,
        };
        move_to(student, booking);
    }
}module StudyCircle::LearningPlatform {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// Struct representing a user's learning profile with credits and badges
    struct LearnerProfile has store, key {
        learning_credits: u64,      // On-chain learning credits earned
        badges_earned: u64,         // Number of verified badges/credentials
        total_sessions: u64,        // Total peer learning sessions participated
        credits_spent: u64,         // Total credits spent on tutoring
        premium_access: bool,       // Premium content access status
    }

    /// Struct representing tutor booking and payment system
    struct TutorBooking has store, key {
        tutor_address: address,     // Verified tutor's address
        session_cost: u64,          // Cost in APT tokens via escrow
        credits_required: u64,      // Learning credits needed for booking
        total_bookings: u64,        // Total successful bookings
        earnings: u64,              // Total earnings from tutoring
    }

    /// Function to participate in peer learning sessions and earn credits & badges
    public fun participate_and_earn_credits(
        learner: &signer,
        sessions_completed: u64,
        badges_earned: u64
    ) acquires LearnerProfile {
        let learner_addr = signer::address_of(learner);
        
        // Create or update learner profile
        if (!exists<LearnerProfile>(learner_addr)) {
            let profile = LearnerProfile {
                learning_credits: sessions_completed * 10, // 10 credits per session
                badges_earned,
                total_sessions: sessions_completed,
                credits_spent: 0,
                premium_access: badges_earned >= 5, // Premium access with 5+ badges
            };
            move_to(learner, profile);
        } else {
            let profile = borrow_global_mut<LearnerProfile>(learner_addr);
            profile.learning_credits = profile.learning_credits + (sessions_completed * 10);
            profile.badges_earned = profile.badges_earned + badges_earned;
            profile.total_sessions = profile.total_sessions + sessions_completed;
            profile.premium_access = profile.badges_earned >= 5;
        }
    }

    /// Function to book tutor via Aptos escrow payment and use learning credits
    public fun book_tutor_with_credits(
        student: &signer,
        tutor_address: address,
        escrow_payment: u64,
        credits_to_use: u64
    ) acquires LearnerProfile {
        let student_addr = signer::address_of(student);
        let student_profile = borrow_global_mut<LearnerProfile>(student_addr);
        
        // Verify student has enough credits
        assert!(student_profile.learning_credits >= credits_to_use, 1);
        
        // Transfer APT tokens via escrow to tutor
        let payment = coin::withdraw<AptosCoin>(student, escrow_payment);
        coin::deposit<AptosCoin>(tutor_address, payment);
        
        // Deduct credits and update profile
        student_profile.credits_spent = student_profile.credits_spent + credits_to_use;
        student_profile.learning_credits = student_profile.learning_credits - credits_to_use;
        
        // Create tutor booking record under student's account
        let booking = TutorBooking {
            tutor_address,
            session_cost: escrow_payment,
            credits_required: 
            