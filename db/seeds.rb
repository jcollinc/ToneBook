puts "Seeding...🌱"


# Test Data 

# User  

jon = User.create(username: "jon@test.com", password: "password", name: "Jon", image: "https://wallpaperaccess.com/full/709482.jpg", bio: "No bio yet!", is_private: true)
jon2 = User.create(username: "jon2@test.com", password: "password", name: "Jon 2", image: "https://wallpaperaccess.com/full/709482.jpg", bio: "No bio yet!", is_private: true)

# Routine

routine = Routine.create(user_id: jon.id, name: "Blues", description: "Collection of blues exercises", image: "https://image.pbs.org/poster_images/assets/SF_121_TN_Is-Blues-the-Mother-of-All-Modern-Music_PBSLearning.jpg")
routine2 = Routine.create(user_id: jon2.id, name: "Blues", description: "Collection of blues exercises", image: "https://image.pbs.org/poster_images/assets/SF_121_TN_Is-Blues-the-Mother-of-All-Modern-Music_PBSLearning.jpg")

# Exercise 

exercise = Exercise.create(routine_id: routine.id, name: "B.B. Shuffle", description: "A classic lick", image: "https://cdn.mos.cms.futurecdn.net/KQMshU6BHcHE3naqswtKZc-1200-80.jpg")
exercise2 = Exercise.create(routine_id: routine2.id, name: "B.B. Shuffle", description: "A classic lick", image: "https://cdn.mos.cms.futurecdn.net/KQMshU6BHcHE3naqswtKZc-1200-80.jpg")


puts "Seeding complete! ✅"