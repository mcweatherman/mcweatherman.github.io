// Resume content
const resumeLines = [
    {
        subheading: "WORK EXPERIENCE",
        body: [
            "Sustainability Specialist @  Steven Winter Associates, Feb 2026 - Present",
            "- Energy modeling, load sizing, and light power density analysis",
            "- Green building certification assistance for programs such as Energy Star Multifamily New Construction, Efficient New Homes (formally Zero Energy Ready Home), Enterprise Green Communities, and Indoor AirPlus",
            "- Blower door tests, duct leakage tests, and final verification documentation for previously mentioned programs",
            "- Meeting with clients, contractors, and subcontractors for sustainable and efficient construction guidance",
            " ",
            " ",
            "Carpentry and Window Assembly @  GO Logic, Jan 2025 - Dec 2025",
            "- Built, rigged, and installed panelized wall, roof, and floor assemblies",
            "- Operated an automated CNC cut saw and used BIM and CAD models",
            "- Managed window assembly process and developed sealing methods",
            "- Participated with table top marketing and symposium events",
            "- Put building science principles into action through passive prefab construction"
        ]
    },
    {
        subheading: "RESEARCH INTERNSHIP",
        body: [
            "Building Science Intern @  Pacific Northwest National Laboratory, May 2024 - Dec 2024",
            "- Office of Energy Efficiency and Renewable Energy",
            "- Two internship sessions with corresponding research papers and symposia presentations about the assembly details and data of 300 + efficient homes",
            "- Organized, categorized, and compiled data and files relating to the Building America Solution Center, Zero Energy Ready Home Program, and Housing Innovation Awards"
        ]
    },
    {
        subheading: "EDUCATION",
        body: [
            "(BS) Building Science @  Appalachian State University, Aug 2020 - May 2024",
            "- Concentration in Architectural Technology and Design",
            "- Minor in Sustainable Technology",
            "- Secretary of American Institute of Architecture Students",
            "- Member of United States Green Building Council",
            "- Member of National Association of Home Builders"
        ]
    },
    {
        subheading: "SKILLS",
        body: [
            "- CAD and BIM Software; Revit, AutoCAD, cadwork, SketchUp, RSMeans, BEAM, Data Logging, Excel",
            "- Experience with power tools and machinery",
            "- Technical adaptability and troubleshooting",
            "- Mathematics, physics, structures and elasticity",
            "- Creative concept design"
        ]
    },
    {
        subheading: "VOLUNTEERING",
        body: [
            "- Watauga County Habitat for Humanity",
            "- American Red Cross (Leaders Save Lives Scholarship)",
        ]
    },
    {
        subheading: "CONTACT",
        body: [
            "Email: milesweatherman@gmail.com",
            "Phone: (336) 596-8248"
        ]
    }
];

const resumeContainer = document.getElementById("resumeContainer");
const nameElement = document.querySelector(".typing.name");

const NAME_SPEED = 40;

// Typewriter for name
function typeName(text) {
    return new Promise((resolve) => {
        let i = 0;
        function step() {
            nameElement.textContent = text.slice(0, i);
            i++;
            if (i <= text.length) {
                setTimeout(step, NAME_SPEED);
            } else resolve();
        }
        step();
    });
}

// Build resume blocks
function buildResume() {
    for (const section of resumeLines) {
        const block = document.createElement("div");
        block.className = "resume-block";

        const sub = document.createElement("div");
        sub.className = "subheading";
        sub.textContent = section.subheading;
        block.appendChild(sub);

        for (const text of section.body) {
            const body = document.createElement("div");
            body.className = "body";

            // Detect job lines with '@' and commas
            if (text.includes("@")) {
                const match = text.match(/^(.*?)\s*@\s*(.*?),\s*(.*)$/);
                if (match) {
                    const left = document.createElement("div");
                    left.className = "left-part";

                    const job = document.createElement("span");
                    job.className = "job-title";
                    job.textContent = match[1].trim();

                    const atSymbol = document.createElement("span");
                    atSymbol.className = "at-symbol";
                    atSymbol.textContent = "@";

                    const company = document.createElement("span");
                    company.className = "company";
                    company.textContent = match[2].trim();

                    left.appendChild(job);
                    left.appendChild(atSymbol);
                    left.appendChild(company);

                    const right = document.createElement("div");
                    right.className = "date";
                    right.textContent = match[3].trim();

                    const wrapper = document.createElement("div");
                    wrapper.className = "job-line";
                    wrapper.appendChild(left);
                    wrapper.appendChild(right);

                    body.appendChild(wrapper);
                } else {
                    body.textContent = text;
                }
            } else {
                body.textContent = text;
            }

            block.appendChild(body);
        }

        resumeContainer.appendChild(block);
    }
}

// Scroll-triggered animation
function animateOnScroll() {
    const blocks = document.querySelectorAll(".resume-block");
    const triggerBottom = window.innerHeight * 0.9;

    blocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            block.classList.add("active");
        }
    });
}

window.addEventListener("load", () => {
    typeName("Miles Weatherman").then(() => {

        // Slide down the big black background panel
        document.getElementById("resumePanel").classList.add("revealed");

        buildResume();
        animateOnScroll();
    });
});
