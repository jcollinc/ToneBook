puts "Seeding...🌱"


# Test Data 

# User  

jon = User.create(username: "jon@test.com", password: "password", name: "Jon", image: "https://i.ibb.co/zSX5Ncj/Screen-Shot-2022-04-11-at-12-31-32-PM-modified.png", bio: "No bio yet!", is_private: true)
jon2 = User.create(username: "jon2@test.com", password: "password", name: "Jon 2", image: "https://i.ibb.co/zSX5Ncj/Screen-Shot-2022-04-11-at-12-31-32-PM-modified.png", bio: "No bio yet!", is_private: true)

# Routines

#U1
blues = Routine.create(user_id: jon.id, name: "Blues", description: "Collection of blues exercises", image: "https://image.pbs.org/poster_images/assets/SF_121_TN_Is-Blues-the-Mother-of-All-Modern-Music_PBSLearning.jpg")
songs = Routine.create(user_id: jon.id, name: "Songs", description: "Songs to practice", image: "https://preview.redd.it/npq5bdmd9qi41.jpg?auto=webp&s=0c18b3e6e5de2d3b95144e13702c90363ef0acb1")
chords = Routine.create(user_id: jon.id, name: "Chords", description: "Some interesting chord shapes", image: "https://wallpaperbat.com/img/278205-music-sheet-wallpaper.jpg")

#U2
blues2 = Routine.create(user_id: jon2.id, name: "Blues 2", description: "Collection of blues exercises", image: "https://image.pbs.org/poster_images/assets/SF_121_TN_Is-Blues-the-Mother-of-All-Modern-Music_PBSLearning.jpg")
songs2 = Routine.create(user_id: jon2.id, name: "Songs 2", description: "Songs to practice", image: "https://preview.redd.it/npq5bdmd9qi41.jpg?auto=webp&s=0c18b3e6e5de2d3b95144e13702c90363ef0acb1")
chords2 = Routine.create(user_id: jon2.id, name: "Chords 2", description: "Some interesting chord shapes", image: "https://wallpaperbat.com/img/278205-music-sheet-wallpaper.jpg")

# Exercises

#U1
tomo = Exercise.create(routine_id: blues.id, name: "Basic Blues Phrasing", bpm: 100, description: "Tomo Fujitsa going over some basic blues phrasing", video_url: "https://www.youtube.com/watch?v=EquYDSZ0T_8", notes: "*pay attention to the triads that make up the chords of the rhythm track*", is_private: true)
bb = Exercise.create(routine_id: blues.id, name: "B.B. Lesson", bpm: 100, description: "Masterclass by B.B. King", video_url: "https://www.youtube.com/watch?v=BL6PenV0HNw", notes: "Study that solo at 41:40", is_private: true)
justin = Exercise.create(routine_id: blues.id, name: "Blues Arpeggios", bpm: 100, description: "Justin Sandercoe going over advanced blues arpeggios", video_url: "https://www.youtube.com/watch?v=D-GpiMgq-EU", notes: "", is_private: true)
cliffs = Exercise.create(routine_id: songs.id, name: "Cliffs of Dover", bpm: 192, description: "Thanks Eric", video_url: "https://www.youtube.com/watch?v=aiRn3Zlw3Rw", notes: "Cool.", is_private: true)
nito = Exercise.create(routine_id: songs.id, name: "Homesick", bpm: 84, description: "Another Ichika Nito one", video_url: "https://www.youtube.com/watch?v=ZUxFFH3Aekg", notes: "COOL.", is_private: true)
castles = Exercise.create(routine_id: songs.id, name: "Castles Made of Sand", bpm: 94, description: "Hendrix Cover", video_url: "https://www.youtube.com/watch?v=VjWt79eNyMM&t=15s", notes: "Yes.", is_private: true)
paul_chords = Exercise.create(routine_id: chords.id, name: "Some Chords", bpm: 120, description: "Paul Davids - Chords and Progressions", video_url: "https://www.youtube.com/watch?v=K_T-jYyQCbQ", notes: "Switching up some basic chord shapes", is_private: true)
ichika = Exercise.create(routine_id: chords.id, name: "Some more chords", bpm: 120, description: "Ichika again?", video_url: "https://www.youtube.com/watch?v=qBTYkNZw5g8", notes: "Ichika again.", is_private: true)
progressions = Exercise.create(routine_id: chords.id, name: "Chord Progressions Tutorial", bpm: 120, description: "Tips on writing better chord progressions (with theory!)", video_url: "https://www.youtube.com/watch?v=ZlYlg0y_8mA", notes: "Have the circle of fifths handy", is_private: true)

#U2
tomo2 = Exercise.create(routine_id: blues2.id, name: "Basic Blues Phrasing 2", bpm: 100, description: "Tomo Fujitsa going over some basic blues phrasing", video_url: "https://www.youtube.com/watch?v=EquYDSZ0T_8", notes: "*pay attention to the triads that make up the chords of the rhythm track*", is_private: true)
bb2 = Exercise.create(routine_id: blues2.id, name: "B.B. Lesson 2", bpm: 100, description: "Masterclass by B.B. King", video_url: "https://www.youtube.com/watch?v=BL6PenV0HNw", notes: "Study that solo at 41:40", is_private: true)
justin2 = Exercise.create(routine_id: blues2.id, name: "Blues Arpeggios 2", bpm: 100, description: "Justin Sandercoe going over advanced blues arpeggios", video_url: "https://www.youtube.com/watch?v=D-GpiMgq-EU", notes: "", is_private: true)
cliffs2 = Exercise.create(routine_id: songs2.id, name: "Cliffs of Dover 2", bpm: 192, description: "Thanks Eric", video_url: "https://www.youtube.com/watch?v=aiRn3Zlw3Rw", notes: "Cool.", is_private: true)
nito2 = Exercise.create(routine_id: songs2.id, name: "Homesick 2", bpm: 84, description: "Another Ichika Nito one", video_url: "https://www.youtube.com/watch?v=ZUxFFH3Aekg", notes: "COOL.", is_private: true)
castles2 = Exercise.create(routine_id: songs2.id, name: "Castles Made of Sand 2", bpm: 94, description: "Hendrix Cover", video_url: "https://www.youtube.com/watch?v=VjWt79eNyMM&t=15s", notes: "Yes.", is_private: true)
paul_chords2 = Exercise.create(routine_id: chords2.id, name: "Some Chords 2", bpm: 120, description: "Paul Davids - Chords and Progressions", video_url: "https://www.youtube.com/watch?v=K_T-jYyQCbQ", notes: "Switching up some basic chord shapes", is_private: true)
ichika2 = Exercise.create(routine_id: chords2.id, name: "Some more chords 2", bpm: 120, description: "Ichika again?", video_url: "https://www.youtube.com/watch?v=qBTYkNZw5g8", notes: "Ichika again.", is_private: true)
progressions2 = Exercise.create(routine_id: chords2.id, name: "Chord Progressions Tutorial 2", bpm: 120, description: "Tips on writing better chord progressions (with theory!)", video_url: "https://www.youtube.com/watch?v=ZlYlg0y_8mA", notes: "Have the circle of fifths handy", is_private: true)

# Test Calendar Dates 

#U1
CalendarDate.create(user_id: 1, date: '2022-03-31')
CalendarDate.create(user_id: 1, date: '2022-04-01')
CalendarDate.create(user_id: 1, date: '2022-04-06')


puts "Seeding complete! ✅"