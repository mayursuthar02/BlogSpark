const dummyBlogs = [
    {
        "id" : 1,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "assets/Images/coverImg.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "food",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021",
        "username": "mayur"
    },
    {
        "id" : 2,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "travel",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021",
        "username": "dilip_suthar97"
    },
    {
        "id" : 3,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "food",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021",
        "username": "mukesh"
    },
    {
        "id" : 4,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "travel",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021",
        "username": "mayur2"
    },
    {
        "id" : 5,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "news",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
    {
        "id" : 6,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "fashion",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
    {
        "id" : 7,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "travel",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
    {
        "id" : 8,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "news",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
    {
        "id" : 9,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "travel",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
    {
        "id" : 10,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "Food",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
    {
        "id" : 11,
        "title" : "Ridiculously Good Air Fryer Salmon",
        "subDesc" : "My go-to salmon recipe that’s perfect every time! Crisped and golden on the outside, buttery and juicy on the inside, and made in 15 minutes start to finish.",
        "imgSrc" : "./assets/Images/img1.jpg",
        "content" : "Guys, this air fryer salmon has changed my salmon game. It’s loaded with flavor, and the air fryer gives it a crusty, crisped exterior while keeping a consistently juicy, buttery interior texture. Each piece just gently slips apart when you press a fork on it, and it is utterly delightful. This one goes in my forever files! I’ve made this SO MANY TIMES in the last few weeks. Ways we’ve loved it:",
        "categories" : "news",
        "tags" : "#food #favorite #trending #bestFood",
        "date" : "30 May, 2021"
    },
]

export default dummyBlogs