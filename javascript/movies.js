// =========================================================
// NETFLIX MOVIE DATABASE
// =========================================================

const movies = [

    // =====================================================
    // INTERNATIONAL / POPULAR
    // =====================================================

    {
        id: 1,
        title: "Stranger Things",
        trailer: "b9EkMc79ZSU",
        year: "2025",
        rating: "16+",
        seasons: "4 Seasons",
        genre: "Drama",
        description:
            "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces."
    },

    {
        id: 2,
        title: "Wednesday",
        trailer: "Di310WS8zLk",
        year: "2025",
        rating: "13+",
        seasons: "2 Seasons",
        genre: "Fantasy",
        description:
            "Wednesday Addams investigates mysterious events while navigating life at Nevermore Academy."
    },

    {
        id: 3,
        title: "Squid Game",
        trailer: "oqxAJKy0ii4",
        year: "2024",
        rating: "16+",
        seasons: "3 Seasons",
        genre: "Thriller",
        description:
            "Hundreds of desperate contestants compete in mysterious games for a life-changing prize."
    },

    {
        id: 4,
        title: "Money Heist",
        trailer: "_InqQJRqGW4",
        year: "2021",
        rating: "16+",
        seasons: "5 Parts",
        genre: "Crime",
        description:
            "A criminal mastermind and his team attempt an ambitious heist against impossible odds."
    },

    {
        id: 5,
        title: "The Witcher",
        trailer: "ndl1W4ltcmg",
        year: "2023",
        rating: "16+",
        seasons: "3 Seasons",
        genre: "Fantasy",
        description:
            "A monster hunter struggles to find his place in a dangerous world."
    },

    {
        id: 6,
        title: "Dark",
        trailer: "ESEUoa-mz2c",
        year: "2020",
        rating: "16+",
        seasons: "3 Seasons",
        genre: "Sci-Fi",
        description:
            "Four families uncover a mystery that spans several generations."
    },

    {
        id: 7,
        title: "The Night Agent",
        trailer: "YDbnY9Obsfs",
        year: "2025",
        rating: "16+",
        seasons: "2 Seasons",
        genre: "Action",
        description:
            "An FBI agent answers a mysterious phone call that pulls him into a dangerous conspiracy."
    },

    {
        id: 8,
        title: "The Umbrella Academy",
        trailer: "0DAmWHxeoKw",
        year: "2024",
        rating: "16+",
        seasons: "4 Seasons",
        genre: "Fantasy",
        description:
            "A dysfunctional family of superheroes reunites to prevent an impending apocalypse."
    },

    {
        id: 9,
        title: "Peaky Blinders",
        trailer: "oVzVdvGIC7U",
        year: "2022",
        rating: "16+",
        seasons: "6 Seasons",
        genre: "Drama",
        description:
            "A powerful crime family builds an empire in post-war Birmingham."
    },

    {
        id: 10,
        title: "Bridgerton",
        trailer: "gpv7ayf_tyE",
        year: "2024",
        rating: "13+",
        seasons: "3 Seasons",
        genre: "Romance",
        description:
            "The Bridgerton family navigates love, society and scandal in Regency-era London."
    },


    // =====================================================
    // ACTION
    // =====================================================

    {
        id: 11,
        title: "Jawan",
        trailer: "COv52Qyctws",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A man driven by a personal vendetta fights corruption and seeks justice."
    },

    {
        id: 12,
        title: "Pathaan",
        trailer: "vqu4z34wENw",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "An Indian spy returns from exile to stop a dangerous enemy."
    },

    {
        id: 13,
        title: "Extraction",
        trailer: "L6P3nI6VnlY",
        year: "2020",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A black-market mercenary must rescue a kidnapped boy."
    },

    {
        id: 14,
        title: "Extraction 2",
        trailer: "Y274jZs5s7s",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A wounded mercenary returns for another dangerous rescue mission."
    },

    {
        id: 15,
        title: "Brahmāstra",
        trailer: "BUjXzrgntcY",
        year: "2022",
        rating: "13+",
        seasons: "Movie",
        genre: "Fantasy",
        description:
            "A young man discovers a mysterious connection to ancient powers."
    },

    {
        id: 16,
        title: "RRR",
        trailer: "NgBoMJy386M",
        year: "2022",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "Two legendary revolutionaries form an extraordinary friendship."
    },

    {
        id: 17,
        title: "KGF Chapter 2",
        trailer: "JKa05nyUmuQ",
        year: "2022",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "Rocky faces powerful enemies while fighting for control of the gold fields."
    },

    {
        id: 18,
        title: "John Wick",
        trailer: "C0BMx-qxsP4",
        year: "2014",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A legendary assassin returns to the criminal underworld."
    },

    {
        id: 19,
        title: "John Wick Chapter 2",
        trailer: "XGk2EfbD_Ps",
        year: "2017",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "John Wick is forced back into the dangerous world of assassins."
    },

    {
        id: 20,
        title: "John Wick Chapter 4",
        trailer: "qEVUtrk8_B4",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "John Wick discovers a path to defeating the High Table."
    },

    {
        id: 21,
        title: "Mission Impossible Fallout",
        trailer: "wb49-oV0F78",
        year: "2018",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "Ethan Hunt faces a dangerous global threat."
    },

    {
        id: 22,
        title: "Top Gun Maverick",
        trailer: "giXco2jaZ_4",
        year: "2022",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A legendary pilot returns to train a new generation."
    },

    {
        id: 23,
        title: "The Gray Man",
        trailer: "BmllggGO4pM",
        year: "2022",
        rating: "16+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A highly skilled operative becomes the target of an international manhunt."
    },

    {
        id: 24,
        title: "Army of the Dead",
        trailer: "tI1JGPhYBS8",
        year: "2021",
        rating: "18+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A group of mercenaries enters a zombie-infested Las Vegas."
    },

    {
        id: 25,
        title: "Black Adam",
        trailer: "X0tOpBuYasI",
        year: "2022",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "An ancient superpowered hero is released into the modern world."
    },

    {
        id: 26,
        title: "The Batman",
        trailer: "mqqft2x_Aa4",
        year: "2022",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "Batman investigates a series of crimes connected to Gotham's elite."
    },

    {
        id: 27,
        title: "Aquaman",
        trailer: "WDkg3h8PCVU",
        year: "2018",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "Arthur Curry discovers his destiny as ruler of Atlantis."
    },

    {
        id: 28,
        title: "Venom",
        trailer: "u9Mv98Gr5pY",
        year: "2018",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A journalist becomes host to a powerful alien symbiote."
    },

    {
        id: 29,
        title: "Black Panther",
        trailer: "xjDjIWPwcPU",
        year: "2018",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "A young king must defend his nation from a powerful enemy."
    },

    {
        id: 30,
        title: "Avengers Endgame",
        trailer: "TcMBFSGVi1c",
        year: "2019",
        rating: "13+",
        seasons: "Movie",
        genre: "Action",
        description:
            "The Avengers attempt to undo the devastating events of the past."
    },


    // =====================================================
    // COMEDY
    // =====================================================

    {
        id: 31,
        title: "The Hangover",
        trailer: "tcdUhdOlz9M",
        year: "2009",
        rating: "18+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "Three friends wake up after a wild bachelor party with no memory of what happened."
    },

    {
        id: 32,
        title: "Free Guy",
        trailer: "X2m-08cOAbc",
        year: "2021",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "A bank employee discovers that he is actually a background character in a video game."
    },

    {
        id: 33,
        title: "Red Notice",
        trailer: "Pj0wz7zu3Ms",
        year: "2021",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "An FBI agent teams up with a notorious thief."
    },

    // {
    //     id: 34,
    //     title: "Central Intelligence",
    //     trailer: "0GQxZ-0w1Yc",
    //     year: "2016",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "Two old classmates become involved in an unexpected spy adventure."
    // },

    {
        id: 35,
        title: "Game Night",
        trailer: "qmxMAdV6s4U",
        year: "2018",
        rating: "16+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "A friendly game night turns into a real-life mystery."
    },

    {
        id: 36,
        title: "We're the Millers",
        trailer: "0Vsy5KzsieQ",
        year: "2013",
        rating: "16+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "A small-time dealer creates a fake family for a dangerous trip."
    },

    {
        id: 37,
        title: "Jumanji Welcome to the Jungle",
        trailer: "2QKg5SZ_35I",
        year: "2017",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "Teenagers are transported into a video game."
    },

    {
        id: 38,
        title: "The Mask",
        trailer: "hOqVRwGVUkA",
        year: "1994",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "A shy man discovers a mysterious mask with magical powers."
    },

    // {
    //     id: 39,
    //     title: "Rush Hour",
    //     trailer: "JMiFsFQcFLE",
    //     year: "1998",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "Two very different detectives must work together."
    // },

    // {
    //     id: 40,
    //     title: "Rush Hour 2",
    //     trailer: "sZyYx4rM2J0",
    //     year: "2001",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "The unlikely detective duo returns for another adventure."
    // },

    // {
    //     id: 41,
    //     title: "Mr Bean's Holiday",
    //     trailer: "h6t9b8c7q2M",
    //     year: "2007",
    //     rating: "7+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "Mr Bean travels to France and creates a series of hilarious situations."
    // },

    {
        id: 42,
        title: "Dumb and Dumber",
        trailer: "l13yPhimE3o",
        year: "1994",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "Two foolish friends embark on an unexpected road trip."
    },

     

    {
        id: 44,
        title: "Superbad",
        trailer: "4eaZ_48ZYog",
        year: "2007",
        rating: "16+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "Two high school friends try to make the most of their final days together."
    },
 

    {
        id: 46,
        title: "We're the Millers 2",
        trailer: "0Vsy5KzsieQ",
        year: "2025",
        rating: "16+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "A group of unlikely companions finds themselves in another chaotic adventure."
    },

    // {
    //     id: 47,
    //     title: "The Other Guys",
    //     trailer: "oEfp6Wj1X8M",
    //     year: "2010",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "Two overlooked detectives get their chance to become heroes."
    // },

    // {
    //     id: 48,
    //     title: "Due Date",
    //     trailer: "hT3Z8R3m9bA",
    //     year: "2010",
    //     rating: "16+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "Two strangers embark on a chaotic road trip."
    // },

    // {
    //     id: 49,
    //     title: "Central Intelligence 2",
    //     trailer: "0GQxZ-0w1Yc",
    //     year: "2025",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "An unexpected partnership leads to another hilarious adventure."
    // },

    // {
    //     id: 50,
    //     title: "The Internship",
    //     trailer: "cdnoqCViqUo",
    //     year: "2013",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Comedy",
    //     description:
    //         "Two salesmen attempt to restart their careers as interns."
    // },


    // =====================================================
    // HORROR
    // =====================================================

    {
        id: 51,
        title: "The Conjuring",
        trailer: "k10ETZ41q5o",
        year: "2013",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "Paranormal investigators help a family terrorized by a dark presence."
    },

    {
        id: 52,
        title: "The Conjuring 2",
        trailer: "VFsmuRPClr4",
        year: "2016",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A paranormal investigation takes place in a haunted London home."
    },

    {
        id: 53,
        title: "IT",
        trailer: "xKJmEC5ieOk",
        year: "2017",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A group of children confronts a terrifying entity."
    },

    {
        id: 54,
        title: "IT Chapter Two",
        trailer: "bKL1ImsN-DU",
        year: "2019",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "The Losers Club returns to confront their childhood nightmare."
    },

    {
        id: 55,
        title: "A Quiet Place",
        trailer: "WR7cc5t7tv8",
        year: "2018",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A family survives in silence while creatures hunt by sound."
    },

    {
        id: 56,
        title: "A Quiet Place Part II",
        trailer: "BpdDN9d9Jio",
        year: "2021",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A family ventures into a dangerous world filled with creatures."
    },

    {
        id: 57,
        title: "Insidious",
        trailer: "zuZnRUcoWos",
        year: "2010",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A family discovers that something supernatural has entered their home."
    },

    {
        id: 58,
        title: "Insidious Chapter 2",
        trailer: "fBbi4NeebAk",
        year: "2013",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "The Lambert family continues to face supernatural forces."
    },

 

    {
        id: 60,
        title: "Annabelle Creation",
        trailer: "KisPhy7T__Q",
        year: "2017",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A group of children encounter a sinister doll."
    },

    {
        id: 61,
        title: "The Nun",
        trailer: "pzD9zGcUNrw",
        year: "2018",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A priest investigates the mysterious death of a nun."
    },

    {
        id: 62,
        title: "The Nun II",
        trailer: "QF-oyCwaArU",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A supernatural evil returns to haunt a French boarding school."
    },

    {
        id: 63,
        title: "Smile",
        trailer: "BcDK7lkzzsU",
        year: "2022",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A psychiatrist experiences terrifying supernatural events."
    },

    {
        id: 64,
        title: "Smile 2",
        trailer: "0HY6QFlBzUY",
        year: "2024",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A pop star begins experiencing terrifying supernatural visions."
    },

   
    {
        id: 66,
        title: "Scream VI",
        trailer: "h74AXqw4Opc",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "Ghostface follows survivors to New York City."
    },

    {
        id: 67,
        title: "The Exorcist",
        trailer: "BU2eYAO31Cc",
        year: "1973",
        rating: "18+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A young girl becomes the center of a terrifying supernatural battle."
    },

    {
        id: 68,
        title: "The Ring",
        trailer: "yzR2GY-ew8I",
        year: "2002",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A journalist investigates a mysterious cursed videotape."
    },

    {
        id: 69,
        title: "The Grudge",
        trailer: "O2NKzO-fxwQ",
        year: "2004",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A supernatural curse spreads through a haunted house."
    },

  


    // =====================================================
    // ROMANCE
    // =====================================================

    {
        id: 71,
        title: "The Notebook",
        trailer: "FC6biTjEyZw",
        year: "2004",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "Two young lovers are separated by circumstances but never forget each other."
    },

    {
        id: 72,
        title: "Me Before You",
        trailer: "Eh993__rOxA",
        year: "2016",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "A young woman forms an unexpected bond with a wealthy man she cares for."
    },

    {
        id: 73,
        title: "La La Land",
        trailer: "0pdqf4P9MB8",
        year: "2016",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "An aspiring actress and musician fall in love while pursuing their dreams."
    },

    {
        id: 74,
        title: "Titanic",
        trailer: "kVrqfYjkTdQ",
        year: "1997",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "Two people from different worlds fall in love aboard the Titanic."
    },

    {
        id: 75,
        title: "To All the Boys I've Loved Before",
        trailer: "555oiY9RWM4",
        year: "2018",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "A teenager's secret love letters are unexpectedly sent to her crushes."
    },

    {
        id: 76,
        title: "The Fault in Our Stars",
        trailer: "9ItBvH5J6ss",
        year: "2014",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "Two teenagers form a deep connection while facing difficult circumstances."
    },

    {
        id: 77,
        title: "Crazy Rich Asians",
        trailer: "ZQ-YX-5bAs0",
        year: "2018",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "A young woman discovers that her boyfriend comes from an extremely wealthy family."
    },

    // {
    //     id: 78,
    //     title: "The Proposal",
    //     trailer: "XQ7z3n2sP3A",
    //     year: "2009",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Romance",
    //     description:
    //         "A boss forces her assistant into a fake engagement."
    // },

    // {
    //     id: 79,
    //     title: "About Time",
    //     trailer: "T7A1YhG3F3M",
    //     year: "2013",
    //     rating: "13+",
    //     seasons: "Movie",
    //     genre: "Romance",
    //     description:
    //         "A young man discovers that the men in his family can travel through time."
    // },

    {
        id: 80,
        title: "Love Actually",
        trailer: "KdzH6a-XEGM",
        year: "2003",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "Several interconnected stories explore love during the holiday season."
    },


    // =====================================================
    // DRAMA
    // =====================================================

    {
        id: 81,
        title: "The Shawshank Redemption",
        trailer: "PLl99DlL6b4",
        year: "1994",
        rating: "16+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A banker imprisoned for murder forms an unlikely friendship."
    },

    {
        id: 82,
        title: "Forrest Gump",
        trailer: "bLvqoHBptjg",
        year: "1994",
        rating: "13+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A kind-hearted man experiences extraordinary moments throughout American history."
    },

    {
        id: 83,
        title: "The Pursuit of Happyness",
        trailer: "DMOBlEcRuw8",
        year: "2006",
        rating: "13+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A struggling father works to build a better life for his son."
    },

    {
        id: 84,
        title: "The Social Network",
        trailer: "lB95KLmpLR4",
        year: "2010",
        rating: "13+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "The story of the creation and rise of a major social network."
    },

    {
        id: 85,
        title: "Whiplash",
        trailer: "7d_jQycdQGo",
        year: "2014",
        rating: "16+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A young drummer pushes himself under an extremely demanding instructor."
    },

    {
        id: 86,
        title: "The Green Mile",
        trailer: "Ki4haFrqSrw",
        year: "1999",
        rating: "16+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A prison guard encounters a mysterious inmate with extraordinary abilities."
    },

    {
        id: 87,
        title: "Good Will Hunting",
        trailer: "PaZVjZEFkRs",
        year: "1997",
        rating: "16+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A brilliant young man receives help confronting his troubled past."
    },

    {
        id: 88,
        title: "The Wolf of Wall Street",
        trailer: "iszwuX1AK6A",
        year: "2013",
        rating: "18+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A stockbroker rises to enormous wealth through reckless ambition."
    },

    {
        id: 89,
        title: "Oppenheimer",
        trailer: "uYPbbksJxIg",
        year: "2023",
        rating: "16+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "The story of the scientist who led the development of the atomic bomb."
    },

    {
        id: 90,
        title: "The Revenant",
        trailer: "LoebZZ8K5N0",
        year: "2015",
        rating: "16+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A frontiersman fights to survive after being betrayed and left for dead."
    },


    // =====================================================
    // INDIAN MOVIES
    // =====================================================

    {
        id: 91,
        title: "Dangal",
        trailer: "x_7YlGv9u1g",
        year: "2016",
        rating: "13+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A former wrestler trains his daughters to become championship wrestlers."
    },

    {
        id: 92,
        title: "3 Idiots",
        trailer: "K0eDlFX9GMc",
        year: "2009",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "Three engineering students challenge the pressure of the education system."
    },

    {
        id: 93,
        title: "PK",
        trailer: "SOXWc32k4tA",
        year: "2014",
        rating: "13+",
        seasons: "Movie",
        genre: "Comedy",
        description:
            "An unusual visitor questions the beliefs and traditions of society."
    },

    {
        id: 94,
        title: "Zindagi Na Milegi Dobara",
        trailer: "FJrpcDgC3zU",
        year: "2011",
        rating: "13+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "Three friends take a life-changing road trip across Spain."
    },

    {
        id: 95,
        title: "Kabir Singh",
        trailer: "RiANSSgCuJk",
        year: "2019",
        rating: "18+",
        seasons: "Movie",
        genre: "Romance",
        description:
            "A brilliant but troubled surgeon struggles after losing his love."
    },

    {
        id: 96,
        title: "Drishyam",
        trailer: "64xJLmcA2K8",
        year: "2015",
        rating: "13+",
        seasons: "Movie",
        genre: "Thriller",
        description:
            "A family man goes to extraordinary lengths to protect his family."
    },

    {
        id: 97,
        title: "Stree 2",
        trailer: "VlvOgk5BHS4",
        year: "2018",
        rating: "16+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A mysterious female spirit haunts a small town."
    },

    {
        id: 98,
        title: "Bhool Bhulaiyaa",
        trailer: "GGzSId0_qJc",
        year: "2007",
        rating: "13+",
        seasons: "Movie",
        genre: "Horror",
        description:
            "A mysterious haunting begins after an old palace is reopened."
    },

    {
        id: 99,
        title: "Chhichhore",
        trailer: "tsxemFX0a7k",
        year: "2019",
        rating: "13+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "Old friends reunite to help a young man rediscover the meaning of failure."
    },

    {
        id: 100,
        title: "Taare Zameen Par",
        trailer: "GGzSId0_qJc",
        year: "2007",
        rating: "7+",
        seasons: "Movie",
        genre: "Drama",
        description:
            "A teacher discovers the hidden talent of a misunderstood child."
    },

 // =========================================================
// BOLLYWOOD HIT MOVIES
// VERIFIED / KNOWN YOUTUBE TRAILER IDS
// =========================================================

{
    id: 101,
    title: "Om Shanti Om",
    trailer: "9oeGoQGt7Ao",
    year: "2007",
    rating: "13+",
    seasons: "Movie",
    genre: "Romance",
    description:
        "A reincarnated film star returns to uncover the truth behind his past and reunite with the love of his life."
},

{
    id: 102,
    title: "Dhoom 3",
    trailer: "yeF_b8EQcK0",
    year: "2013",
    rating: "13+",
    seasons: "Movie",
    genre: "Action",
    description:
        "A mysterious circus performer uses his extraordinary skills to take revenge on a powerful bank."
},

{
    id: 103,
    title: "Dangal",
    trailer: "x_7YlGv9u1g",
    year: "2016",
    rating: "13+",
    seasons: "Movie",
    genre: "Drama",
    description:
        "A former wrestler trains his daughters to become world-class wrestlers."
},

{
    id: 104,
    title: "Sultan",
    trailer: "wPxqcq6Byq0",
    year: "2016",
    rating: "13+",
    seasons: "Movie",
    genre: "Drama",
    description:
        "A former wrestling champion struggles to return to the sport and rebuild his life."
},

{
    id: 105,
    title: "Tiger Zinda Hai",
    trailer: "ePO5M5DE01I",
    year: "2017",
    rating: "16+",
    seasons: "Movie",
    genre: "Action",
    description:
        "An Indian spy returns to rescue hostages held by a dangerous terrorist organization."
},

{
    id: 106,
    title: "Raees",
    trailer: "J7_1MU3gDk0",
    year: "2017",
    rating: "16+",
    seasons: "Movie",
    genre: "Crime",
    description:
        "A powerful businessman rises through the criminal world while facing a determined police officer."
},

{
    id: 107,
    title: "Chennai Express",
    trailer: "hZGR5Sj1Bfo",
    year: "2013",
    rating: "13+",
    seasons: "Movie",
    genre: "Comedy",
    description:
        "A man's journey to immerse his grandfather's ashes becomes an unexpected romantic adventure."
},

{
    id: 108,
    title: "Barfi!",
    trailer: "rVpPO9xuwVY",
    year: "2012",
    rating: "13+",
    seasons: "Movie",
    genre: "Romance",
    description:
        "A charming young man and two women experience an unconventional story of love and friendship."
},

{
    id: 109,
    title: "Yeh Jawaani Hai Deewani",
    trailer: "aG5oOFAO9yc",
    year: "2013",
    rating: "13+",
    seasons: "Movie",
    genre: "Romance",
    description:
        "Four friends reunite and discover how their dreams, relationships and lives have changed."
},

{
    id: 110,
    title: "Zindagi Na Milegi Dobara",
    trailer: "FJrpcDgC3zU",
    year: "2011",
    rating: "13+",
    seasons: "Movie",
    genre: "Drama",
    description:
        "Three friends take a road trip across Spain that changes their lives forever."
},

{
    id: 111,
    title: "3 Idiots",
    trailer: "0mYNaU7vYd0",
    year: "2009",
    rating: "13+",
    seasons: "Movie",
    genre: "Comedy",
    description:
        "Three engineering students challenge the pressure and expectations of the education system."
},

{
    id: 112,
    title: "PK",
    trailer: "Hq7Xk9mGKpo",
    year: "2014",
    rating: "13+",
    seasons: "Movie",
    genre: "Comedy",
    description:
        "An unusual visitor questions society's beliefs while searching for a way home."
},

{
    id: 113,
    title: "Bajrangi Bhaijaan",
    trailer: "74z6rvKLPP0",
    year: "2015",
    rating: "13+",
    seasons: "Movie",
    genre: "Drama",
    description:
        "A kind-hearted man helps a lost Pakistani girl return safely to her family."
},

{
    id: 114,
    title: "Kick",
    trailer: "u-j1nx_HY5o",
    year: "2014",
    rating: "13+",
    seasons: "Movie",
    genre: "Action",
    description:
        "A mysterious thrill-seeker becomes involved in a dangerous game of crime and justice."
},

{
    id: 115,
    title: "Golmaal Again",
    trailer: "0v4Hbf0nl6E",
    year: "2017",
    rating: "13+",
    seasons: "Movie",
    genre: "Comedy",
    description:
        "A group of friends returns to an old house and encounters an unexpected supernatural presence."
},

{
    id: 116,
    title: "Total Dhamaal",
    trailer: "XAIKw1zOtG4",
    year: "2019",
    rating: "13+",
    seasons: "Movie",
    genre: "Comedy",
    description:
        "A group of eccentric characters race against each other to find a hidden treasure."
},

 

{
    id: 119,
    title: "Krrish",
    trailer: "yj4bnTrqwvA",
    year: "2006",
    rating: "13+",
    seasons: "Movie",
    genre: "Action",
    description:
        "A young man with extraordinary abilities discovers his destiny as a superhero."
},

{
    id: 120,
    title: "Shaitaan",
    trailer: "A_HQdwRDRrw",
    year: "2024",
    rating: "16+",
    seasons: "Movie",
    genre: "Horror",
    description:
        "A family finds itself trapped in a terrifying supernatural battle against an evil force."
}


];


// =========================================================
// GENERATE MOVIE POSTERS FROM YOUTUBE TRAILERS
// =========================================================

movies.forEach(movie => {

    movie.image =
        `https://img.youtube.com/vi/${movie.trailer}/hqdefault.jpg`;

});


// =========================================================
// EXPORT MOVIES
// =========================================================
//
// If browse.js is loaded as a normal script,
// the global `movies` variable is available.
//
// If you later convert movies.js to a module,
// use:
//
// export { movies };
//
// =========================================================