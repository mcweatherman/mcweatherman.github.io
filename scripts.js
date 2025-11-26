// Resume content
const resumeLines = [
    {
        subheading: "WORK EXPERIENCE",
        body: [
            "Carpentry and Window Assembly @  GO Logic, Jan 2025 - Present",
            "- Putting building science principles into practice through building, rigging, and installing panelized projects",
            "- Managed window assembly process and developed air sealing methods",
            "- Experience with cadwork software and CNC cutsaw",
            "- Worked with tabletop marketing",
            "- Insulation embodied carbon analysis"
        ]
    },
    {
        subheading: "RESEARCH INTERNSHIP",
        body: [
            "Building Science Intern @  Pacific Northwest National Laboratory, May 2024 - Dec 2024",
            "- Office of Energy Efficiency and Renewable Energy",
            "- Made edits to the Building America Solution Center webpage",
            "- Two internship sessions spent compiling, organizing, and categorizing data for the Zero Energy Ready Home Program",
            "- Two research papers and symposium presentations"
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
        subheading: "OTHER EXPERIENCE",
        body: [
            "- Lifeguarding",
            "- Food Service",
            "- Computer Science",
            "- Sketching, Drawing, and Painting",
            "- Origami and Sculpting"
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
                    atSymbol.textContent = " @ ";

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
