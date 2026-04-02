/**
 * PORTFOLIO DATA ENGINE
 * Edit this file to update your website content.
 */
const data = {
    profile: {
        name: "David John Varghese",
        title: "The Digital Builder",
        bio: [
            "<strong>Architecting the Future of Infrastructure</strong>",
            "Specializing in Computational Intelligence & Digital Transformation"
        ],
        image: "images/profile.jpg",
        logoImage: "images/YTlogo.jpg",
        logoUrl: "https://www.youtube.com/@thedigitalbuilder31"
    },
    youtubeGallery: [
        {
            id: "h9FwV9Ns1Gw",
            title: "Computational Design - A Structural Engineer's Perspective",
            description: "A deep dive into real-world application. I demonstrate how a computational workflow reduced structural modeling time from four days to just one day by using Rhino and Grasshopper to automate analytical model generation in ETABS.",
            tags: ["Rhino", "Grasshopper", "ETABS", "Automation", "Efficiency"]
        },
        {
            id: "h6IL0I0G0ZA",
            title: "Your Roadmap to Computational Design & Structural Engineering",
            description: "A strategic roadmap for students and young professionals entering the AEC industry. While focusing on modern tech like Karamba3D and Python, the video stresses the vital importance of mastering engineering fundamentals (Statics, Mechanics) first.",
            tags: ["Python", "Karamba3D", "AEC Industry", "Fundamentals"]
        },
        {
            id: "ntCwXja-b2U",
            title: "An Introduction to Computational Design - My Personal Journey",
            description: "A retrospective of my work in modular design and infrastructure since 2019. The video highlights the evolution of interoperability tools.",
            tags: ["Modular Design", "Infrastructure", "Interoperability"]
        },
        {
            id: "oXs-2Tjsins",
            title: "Fast Track Your Engineering Career with Computational Design!",
            description: "A motivational guide for engineers looking to accelerate their professional growth.The video emphasises how computational skills empower engineers to in areas like sustainable development and project leadership.",
            tags: ["Career Growth", "Sustainability", "Leadership"]
        },
        {
            id: "fGHidgVUzsU",
            title: "Computational Thinking for Civil Engineers",
            description: "An exploration of how civil engineers can harness computational tools to solve complex infrastructure problems.",
            tags: ["Civil Engineering", "Infrastructure", "Problem Solving"]
        },
        {
            id: "QLsTnHAzHBk",
            title: "Embracing Computational Design",
            description: "More than a tutorial, this is a call to action for the AEC industry to abandon the traditional mentality. I share my personal struggles with industry resistance and why shifting toward a scientific, transparent, and iterative design process is essential for the future of our profession and environmental sustainability.",
            tags: ["AEC Industry", "Digital Transformation", "Sustainability"]
        }
    ],
    metrics: [
        { label: "Years Experience", value: 10, unit: "+", icon: "exp.png", floatingNames: ["AtkinsRéalis", "Arcadis", "WSP", "VSL"] },
        { label: "Sectors Worked In", value: 8, icon: "sec.png", floatingNames: ["Marine", "Rail", "Bridges", "Buildings", "Coastal", "Aviation"] },
        { label: "Project Value", value: 10, unit: "B+", prefix: "£", subLabel: 'Delivered <span class="sub-counter" data-target="20">0</span>+ projects', icon: "prj.png", floatingNames: ["HS2", "HKZMB", "InnoCELL", "HKU", "Greenways"] },
        { label: "Solutions Developed", value: 25, unit: "+", icon: "sol.png", floatingNames: ["Digital-Twin", "Automation", "Data-Analysis", "Optioneering", "Optimisation"] }
    ],
    contact: {
        text: "Reach out to me on LinkedIn. Alternatively check out my CV.",
        link: "https://www.linkedin.com/in/david-john-varghese",
        label: "LinkedIn Profile",
        cv: "files/DJV_CV_V14-UK.docx"
    },
    experience: [
        { date: "Dec 2023 - Present", role: "Design Transformation", company: "AtkinsRéalis, UK", desc: "Leading the Digital Solutions Team (Design & Advanced Technology Practice) to drive digital transformation through consistent development frameworks and team skill empowerment.", logo: "images/ATRL.png", category: "work", tags: ["Digital Transformation", "Leadership", "Strategy"] },
        { date: "Jul 2022 - Dec 2023", role: "Bridge Digital Design", company: "Arcadis, UK", desc: "Primary aim to enable computation and implement automation throughout the business.", logo: "images/arcadis.png", category: "work", tags: ["Automation", "Computation", "Bridges"] },
        { date: "Jun 2021 - Jul 2022", role: "Bridge Design & Digital Development", company: "WSP, UK", desc: "Focused on bridge design with a splash of digital development using visualization.", logo: "images/WSP.png", category: "work", tags: ["Bridge Design", "Visualization", "Digital Development"] },
        { date: "Feb 2021", role: "CEng MICE", company: "Institution of Civil Engineers (UK)", desc: "Chartered Engineer", logo: "images/ice.png", category: "qualification", tags: ["Chartered Engineer", "MICE", "Professionalism"] },
        { date: "Feb 2019 - Jan 2021", role: "Modular Structures", company: "WSP, Hong Kong", desc: "Developed and delivered modular projects with digital innovation.", logo: "images/WSP.png", category: "work", tags: ["Modular", "Innovation", "MiC"] },
        { date: "Oct 2016 - Jan 2019", role: "Contractor Experience", company: "VSL Intrafor, Hong Kong", desc: "Specialist in post-tensioning, heavy lifting, and bridge construction.", logo: "images/VSL.png", category: "work", tags: ["Post-Tensioning", "Construction", "Bridges"] },
        { date: "2015", role: "M.Sc Civil & Structural Engineering", company: "Coventry University, UK", desc: "", logo: "images/uni.png", category: "education", tags: ["MSc", "Structural Engineering", "Research"] },
        { date: "Aug 2013 - Sep 2014", role: "Residential Development", company: "Self-Employed, India", desc: "Acted as a Graduate Engineer for a 12-storey, 47-apartment residential project.", logo: null, category: "work", tags: ["Residential", "Site Engineering", "Project Management"] },
        { date: "2013", role: "B.Tech Civil Engineering", company: "NITJ, Jalandhar, India", desc: "Dr. B. R. Ambedkar National Institute of Technology", logo: "images/NITJ.png", category: "education", tags: ["BTech", "Civil Engineering", "Fundamentals"] }
    ],
    projects: [
        {
            title: "Digital Innovation",
            description: "Architecting bespoke digital ecosystems and automated workflows that eliminate manual redundancy and redefine design accuracy.",
            image: "images/1.gif", 
            tags: ["Computational Design", "Python"],
            subProjects: [
                { 
                    title: "Flood Defence Algorithmic Assessment", 
                    role: "Digital Lead", 
                    project: "Middle Level System River Management Scheme (MLSRMS)",
                    desc: "Led the creation of computational algorithms to automate the analysis of 178km of embankments.",
                    tech: ["Python", "Civil 3D", "Drone LiDAR Data","Dynamo","Autodesk Construction Cloud","QGIS"],
                    outcomes: [
                        "Achieved a 100x increase in assessment granularity (5m intervals vs. 500m).",
                        "Drastically reduced manual error and overall assessment time."
                    ],
                    timeSaved: "Reduced 3 months in project scope delivery enabled by algorithmic processing.",
                    youtube: "ez6bQjI5xVo" 
                },
                {
                    title: "Algorithm Driven Structural Optioneering",
                    role: "Structural Engineer",
                    project: "All Modular Structures Developed whilst working with WSP in Hong Kong",
                    desc: "Developed a custom interoperable link for automated geometry generation and 2nd-order analysis.",
                    tech: ["C++", "Visual Basic", "ETABS API", "Rhino/Grasshopper"],
                    outcomes: [
                        "Enabled real-time story drift verification for several layouts of modular units.",
                        "Facilitated rapid 'fail-fast' architectural coordination."
                    ],
                    timeSaved: "Achieved instant structural verification, replacing a traditional four-day optioneering cycle to half a day.",
                    youtube: "rIsc6R3AO50"
                },
                {
                    title: "Interoperable Bridge Analysis",
                    role: "Structural Engineer",
                    project: "Ipswich Island (WSP, UK) & Arcadis training programme",
                    desc: "Developed automated geometry-to-analysis workflows to push complex geometry directly to FEA engines.",
                    tech: ["BHoM", "Lusas", "Rhino/Grasshopper"],
                    outcomes: [
                        "Automated rapid modelling for bridge options.",
                        "Created a real-time geometric solution for Level Crossing replacements."
                    ],
                    timeSaved: "Reduced FEA model generation time by approximately 60% through direct geometry-to-analysis pipelines.",
                    youtube: "3IUoCYJPxIo"
                },
                {
                    title: "Transforming Project Delivery Workflows",
                    role: "Digital Lead",
                    project: "AtkinsRéalis Infrastructure Practice",
                    desc: "Managing the Digital Community within a 700-person multidisciplinary department. I lead the development of staff and bespoke technical solutions to achieve critical digital and project-specific milestones.",
                    tech: ["Python (OOP)", "Autodesk Construction Cloud", "Power Automate"],
                    outcomes: [
                        "Orchestrated development across diverse technical networks including Coastal, Rivers, Marine, Reservoirs, Dams, Pipelines, Aviation, and Process Mechanical.",
                        "Empowered team skill development through training and managing Digital Communities and established consistent development frameworks to drive digital transformation.",
                        "Automated Structural model setup tool that utilises Autodesk Robot for Combined Sewer Overflows (CSOs), accelerating sizing and feasibility analysis.",
                        "Standardised automated reporting processes by capturing team expertise into automated database-driven generators (DSEAR Reports).",
                    ],
                }
            ]
        },
        {
            title: "DFMA & MMC",
            description: "Implementing Design for Manufacture and Assembly (DFMA) and Modern Methods of Constructiion (MMC) to streamline infrastructure delivery.",
            image: "images/2.png",
            tags: ["Sustainability", "Efficiency"],
            subProjects: [
                {
                    title: "InnoCELL - Modular Integrated Construction (MiC)", 
                    role: "Structural Engineer", 
                    desc: "Engineered various elements of the 17-storey InnoCELL project, a flagship for Modular integrated Construction (MiC).",
                    value: "£80 Million",
                    youtube: "7s2ZceLgBWo",
                    link: "https://mic.cic.hk/en/ProjectsInHongKong/1",
                    linkText: "More Information"
                },
                {
                    title: "Hong Kong University (HKU) - Student Residences",
                    role: "Lead Structural Engineer",
                    desc: "Secured Pre-acceptance approval from the Buildings Department for pioneering modular systems.",
                    youtube: "aSC2PFqJgH8",
                    link: "https://mic.cic.hk/en/ProjectsInHongKong/6",
                    linkText: "More Information"
                },
                {
                    title: "Penny’s Bay & Sai Kung Quarantine Facilities",
                    role: "Design Lead (Rapid Mobilisation)",
                    desc: "Engineered rapid-response modular framing solutions for up to four-storey structures during the COVID-19 pandemic.",
                    timeline: "Feb 2019 – Jan 2021",
                    challenge: "Delivering structurally sound, sustainable buildability provisions under extreme time pressure for immediate mobilisation.",
                    contributions: "Crafted the tender strategy and preliminary substructure-superstructure designs that secured the project bid and enabled rapid on-site assembly.",
                    youtube: "sfv7g-8u1xs",
                    link: "https://mic.cic.hk/en/ProjectsInHongKong/19",
                    linkText: "More Information"
                },
                {
                    title: "HK PolyU Transformable Modular System",
                    role: "Pioneering Research & Design Engineer",
                    desc: "Engineered a revolutionary modular system designed for physical expansion and future relocation.",
                    challenge: "Designing a mechanism that allows modules to expand while maintaining structural integrity during erection.",
                    contributions: "Pioneered a method of erection using the strand-jacking concept and developed the mechanism for module expansion, enabling a sustainable, circular-economy approach to housing.",
                    link: "https://research.polyu.edu.hk/en/publications/expanded-phase-model-for-transformable-design-in-defining-its-usa/",                    
                    linkText: "More Information"
                },    
                {
                    title: "Jat Ming Chuen (Shatin) Elderly Housing",
                    role: "Lead Engineer",
                    desc: "Lead the structural verification and regulatory approval process for a residential modular integrated construction (MiC) system.",
                    challenge: "Overcoming critical flaws in initial structural assumptions regarding load paths and module framing to meet Building Department requirements.",
                    contributions: "Secured crucial Pre-acceptance for the modular system by developing complex analytical models with Second Order analyses. I performed progressive collapse analysis and rationalised member sizing to ensure structural integrity and allowable story drift.",
                    link: "https://mic.cic.hk/en/ProjectsInHongKong/4",
                    linkText: "More Information"
                }                           
            ]
        },
        {
            title: "Major Projects",
            description: "Delivered large-scale infrastructure projects that has changed the landscape of engineering and infrastructure through innovation",
            image: "images/3.jpg",
            tags: ["Civil Eng", "Leadership"],
            subProjects: [
                { 
                    title: "High Speed 2 (HS2), United Kingdom", 
                    role: "Major Infrastructure Design", 
                    desc: "Led and Managed the Development and Delivery of a Standardised UTX design implemented at 87 locations across 75km of HS2 Track",
                    value: "£2.3 Billion",
                    timeline: "August 2022 - November 2023",
                    youtube: "ygI6FGFayyQ",
                    link: "https://www.hs2.org.uk/building-hs2/",
                    linkText: "More Information"
                },
                { 
                    title: "Hong Kong-Zhuhai-Macao Bridge (HZMB)", 
                    role: "Launching Gantry", 
                    desc: "Managed complex segment erection and post-tensioning for the world's longest sea-crossing.",
                    value: "£1.4 Billion",
                    youtube: "WE-t3qYnmMs",
                    link: "https://dragageshk.com/project/hong-kong-zhuhai-macao-bridge-hong-kong-link-road/",
                    linkText: "More Information"
                },
                { 
                    title: "Liantang / Heung Yuen Wai Boundary Control Point", 
                    role: "Specialist Subcontractor (VSL)", 
                    desc: "Managed several complex segment erection methods and post-tensioning for the boundary control point infrastructure.",
                    value: "£35 Million",
                    link: "https://vsl.com/project/liantang-heung-yuen-wai-boundry-control-point/",
                    linkText: "More Information"
                },
                {
                    title: "Tuen Mun-Chek Lap Kok (TM-CLK) Links's Northern Connection",
                    role: "Site Production & Quality Management",
                    desc: "Managed the specialist delivery of Diaphragm walls for a 50-metre-deep sea tunnel entrance, facilitating one of Hong Kong's most ambitious sub-sea links",
                    value: "£60 Million",
                    timeline: "Jan 2018 – Jan 2019",
                    videos: [
                        { title: "Caterpillar Structure Innovation", id: "G7H4w5APTe8" },
                        { title: "Project Showcase", id: "-zh7vifi5_U" }
                    ],
                    link: "https://vsl.com/project/tuen-mun-chek-lap-kok-links-northern-connection/",
                    linkText: "View Project Profile"
                }
            ]
        },
        {
            title: "Thought Leadership",
            description: "Advocating for digital transformation through public speaking and technical publications.",
            image: "images/4.jpg", 
            tags: ["Speaking", "Articles"],
            subProjects: [
                {
                    title: "How to instil the right culture to enable a digital transformation",
                    role: "Speaker",
                    desc: "Exploring how organisational culture drives successful digital adoption.",
                    link: "https://www.ice.org.uk/events/recorded-lectures/instil-the-right-culture-to-enable-a-digital-transformation",
                    linkText: "Watch Webinar"
                },
                {
                    title: "Beyond the tech: Why people are the true key to digital transformation in construction",
                    role: "Author - Digital Construction Week 2024",
                    desc: "Discussing the human element of digital transformation.",
                    link: "https://www.digitalconstructionweek.com/beyond-the-tech-why-people-are-the-true-key-to-digital-transformation-in-construction/",
                    linkText: "Read Article"
                },
                {
                    title: "The Future Digital Civil Engineer: Merging ICE Attributes with Digital Transformation",
                    role: "Author - Structures Insider",
                    desc: "An article exploring how traditional professional attributes merge with digital skills to define the future of civil engineering.",
                    link: "https://www.structuresinsider.com/post/the-future-digital-civil-engineer-merging-ice-attributes-with-digital-transformation",
                    linkText: "Read Article"
                },
                {
                    title: "Computational Design: A Structural Engineer's Perspective",
                    role: "Author - The Structural Engineer (IStructE)",
                    desc: "A technical publication in the IStructE journal discussing the integration of computational tools to streamline structural analysis and design.",
                    link: "https://cloud.3dissue.com/197524/197884/231860/Volume7-Issue2/index.html?page=44",
                    linkText: "Read Journal Article"
                }
                ]
        }
    ]
};