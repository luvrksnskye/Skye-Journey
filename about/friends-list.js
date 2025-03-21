// sound elements to the HTML
const clickSound = document.createElement('audio');
clickSound.id = 'click-sound';
clickSound.src = '../assets/sound-effects/sound effect.mp3';
document.body.appendChild(clickSound);

const starSound = document.createElement('audio');
starSound.id = 'star-sound';
starSound.src = '../assets/sound-effects/mystical-chime.mp3';
document.body.appendChild(starSound);

// blur overlay and constellation container
const blurOverlay = document.createElement('div');
blurOverlay.className = 'blur-overlay';
document.body.appendChild(blurOverlay);

const constellationImage = document.createElement('div');
constellationImage.className = 'constellation-image';
document.body.appendChild(constellationImage);

// styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .blur-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(8px);
        background: rgba(255, 255, 255, 0.04);
        display: none;
        z-index: 1;
    }

    .constellation-image {
        position: fixed;
        left: 900px;
        top: 50%;
        transform: translateY(-50%);
        width: 400px;
        height: 400px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: none;
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease, background-image 0.3s ease, filter 0.3s ease;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) 
               drop-shadow(0 0 40px rgba(255, 255, 255, 0.6)) 
               drop-shadow(0 0 60px rgba(255, 255, 255, 0.4));
    }

    @keyframes pulseGlow {
        0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))
                   drop-shadow(0 0 40px rgba(255, 255, 255, 0.6))
                   drop-shadow(0 0 60px rgba(255, 255, 255, 0.4));
        }
        50% {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1))
                   drop-shadow(0 0 50px rgba(255, 255, 255, 0.8))
                   drop-shadow(0 0 70px rgba(255, 255, 255, 0.6));
        }
    }

    .constellation-image {
        animation: pulseGlow 2s infinite;
    }

    .inventory-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

    .inventory-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.5rem;
    }

    .inventory-item img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

    .inventory-item span {
        font-size: 0.9rem;
        color: #fff;
    }
        .constellation-image:hover {
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1))
            drop-shadow(0 0 50px rgba(255, 255, 255, 0.8))
            drop-shadow(0 0 70px rgba(255, 255, 255, 0.6));
    transition: filter 0.3s ease;
}

.inventory-item img:hover {
   filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1))
            drop-shadow(0 0 50px rgba(255, 255, 255, 0.8))
            drop-shadow(0 0 70px rgba(255, 255, 255, 0.6));
    transform: scale(1.1); 
    transition: transform 0.3s ease, filter 0.3s ease;
}
        .info-panel {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s;
    }

    .info-panel.visible {
        opacity: 1;
        visibility: visible;
    }
         .website-link {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

    .website-link:hover {
        background-color: rgba(255, 255, 255, 0.34);
        filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1))
            drop-shadow(0 0 50px rgba(255, 255, 255, 0.8))
            drop-shadow(0 0 70px rgba(255, 255, 255, 0.6));
    transition: filter 0.3s ease;
    }

`;
document.head.appendChild(styleSheet);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Create info panel
const infoPanel = document.createElement('div');
infoPanel.className = 'info-panel';
document.body.appendChild(infoPanel);

// Configuration
const particles = [];
const num_particles = 250;
const distance = 200;
const speed = 0.3;
const radius = 3;
const lineWidth = 0.5;
const maxConnections = 5;

// Special particle information
const specialParticles = [
    {
        name: "SelySun",
        description: "Selysun is a digital artist, anime fan, pokémon lover and part of the furry fandom. She is very creative and loves to draw and illustrate. She manages many projects and works alongside Skye to develop amazing things! She is a video game enthusiast. Her drawings are illustrated with an adorable and friendly theme with soft colors.",
        attributes: `✦ Creative drawing and character design skills
✦ INFP 4w5
✦ Cat lover
✦ Personality: Kind
✦ Sobble lover!!
✦ Videogames lover
✦ She likes to look at the clouds lol`,
        inventory: [
            {
                img: "friends-items/dreamy-cone-three-flavors.png",
                name: "dreamy ice cream cone"
            },
            {
                img: "friends-items/a-leisurely-sip.png",
                name: "catpuccino"
            },

            {
                img: "friends-items/lighter-than-air-pancake.png",
                name: "breakfast...?"
            },
            {
                img: "friends-items/tricolor-dango.png",
                name: "dango"
            }
        ],
        websiteUrl: "https://selysun.carrd.co/",
        constellation: "friends-constellation/sely.png"
    },
    {
        name: "RegreDanger",
        description: "RegreDanger is a young developer passionate about technology and code, he is one of Skye's friends who usually shares that love of messing around with code and tech. Regre is learning about programming languages, has projects in mind and is quite motivated by them. He likes Java and Python.",
        attributes: `✦ Future software developer
✦ ISFJ 9w1
✦ Really loves tech!!
✦ Personality: Peppy
✦ Pokémon lover
✦ Java programming skills
✦ Silly humor
✦ Indie videogames lover
✦ Likes to draw`,
        inventory: [
            {
                img: "friends-items/taiyaki.png",
                name: "taiyaki"
            },
            {
                img: "friends-items/potato-fries-sundae.png",
                name: "french fries... with ice cream?"
            },
            {
                img: "friends-items/dream-syrup.png",
                name: "dream syrup"
            },
            {
                img: "friends-items/rainbow-macarons.png",
                name: "macarons!!"
            },
            {
                img: "friends-items/IconCoffe_1.png",
                name: "coffe"
            }
        ],
        website: "",
        websiteUrl:"https://regredangernetworkroom.carrd.co/",
        constellation: "friends-constellation/regre.png"
    },
    {
        name: "Luciferaza",
        description: "Luciferaza is a full-time freelance artist who also designs amazing characters and often sells adopts. Her coloring is fantastic and beautiful, she is very good at illustrating and if you would like to find an artist with good content to commission, then she would be your choice!",
        attributes: `✦ Extremely good and constantly improving drawing skills!!
✦ ISFP 6w7
✦ Initially portrayed as stubborn and rude, though she opens up and acts like a good friend
✦ Personality: Lazy
✦ She really enjoys sushi
✦ Xiao lover fr fr
✦ Very silly humor
✦ Indie videogames fan
✦ Loves buttercup flowers
✦ She has many cats and loves them
✦ Genderfluid`,
        inventory: [
            {
                img: "friends-items/hundredlayer-sundae-zero-calories.png",
                name: "huge ice cream lol"
            },
            {
                img: "friends-items/sweet-dream.png",
                name: "sweet dream... Xiao's specialty!"
            },
            {
                img: "friends-items/tuna-sushi.png",
                name: "a full stack of poisoned sushi for some reason"
            },
            {
                img: "friends-items/onigiri.png",
                name: "onigiri"
            },
            {
                img: "friends-items/tea-break-pancake.png",
                name: "very cute breakfast"
            }
        ],
        website: "",
        websiteUrl: "https://luciferaza.drr.ac/",
        constellation: "friends-constellation/luciferaza.png"
    },
    {
        name: "Noiz",
        description: "Noiz is a very talented and unique furry artist, and a good friend too! This rbg dragon has incredible flexibility about his art and the way he handles colors and character designs is just amazing. If you're looking for an artist to illustrate your best scenarios or are looking for someone who specializes in big boys and dragons, then Noiz is the ideal person.",
        attributes: `✦ Big boy with a big heart
✦ INTP 5w6
✦ Really loves dragons!!
✦ Personality: Peppy
✦ Pokémon fan
✦ Kazuha lover
✦ Silly humor
✦ Nice and friendly dragon
✦ He loves cake!!`,
        inventory: [
            {
                img: "friends-items/pour-la-justice.png",
                name: "cake"
            },
            {
                img: "friends-items/rainbow-aster.png",
                name: "rainbow aster"
            },
            {
                img: "friends-items/padisarah-pudding.png",
                name: "pudding!"
            },
            {
                img: "friends-items/sweet-shrimp-sushi.png",
                name: "some sushi he took from his girlfriend"
            },
            {
                img: "friends-items/la-lettre-a-focalors.png",
                name: "more cake"
            }
        ],
        website: "",
        websiteUrl: "https://noisy-dragon.drr.ac/",
        constellation: "friends-constellation/noiz.png"
    },
{
        name: "Narr",
        description: "A passionate graphic designer and digital artist with a special love for Undertale. Creating unique visual experiences through digital art and design. Narr has been one of my best friends for many years, we've grown together and we're still together today. His content is really good, and his characters have interesting stories. If you like Undertale or indie video games, you should definitely check out his Twitter (X) or carrd!",
        attributes: `✦ Character design skills
✦ Undertale enthusiast
✦ Sans lover
✦ Undertale and FNAF nerd!!
✦ idk we are besties
✦ Video games lover
✦ Local seal with internet access who likes to annoy their friends`,
inventory: [
    {
        img: "friends-items/energizing-bento.png",
        name: "cute bento box"
    },
    {
        img: "friends-items/invigorating-kitty-meal.png",
        name: "kitty meal!"
    },
    {
        img: "friends-items/lightless-eye-of-the-maelstrom.png",
        name: "there is a black hole in their pocket"
    },
    {
        img: "friends-items/trash.png",
        name: "trash???"
    },
    {
        img: "friends-items/pleasantlooking-trash.png",
        name: "pleasant looking trash lol"
    }
],
website: "",
        website: "https://mochynarr.carrd.co/",
        constellation: "friends-constellation/narr.png" 
    },
    {
        name: "Planet MFN Pearlia",
        description: "Hana is a technical designer with a love for interactive experiences and cute design work. A refugee of modern social media, she is a strong lover of the indie web and promotes as many people as possible making their own sites.",
        attributes: `✦ Very kind and driven
✦ Strong Graphic and Web Design skills
✦ Unsettling aesthetic lover
✦ Can be quite socially awkward at times. lol
✦ Enjoys video games of all types`,
inventory: [
    {
        img: "friends-items/Rose_Bush.png",
        name:  "a cute and big rose bush!"
    },
    {
        img: "friends-items/Unknown.png",
        name:  "Unknown"
    },
    {
        img: "friends-items/Unknown.png",
        name:  "Unknown"
    },
    {
        img: "friends-items/Unknown.png",
        name:  "Unknown"
    },
    {
        img: "friends-items/Unknown.png",
        name: "Unknown"
    }
],
website: "",
        websiteUrl: "https://planetpearlia.com/",
        constellation: "friends-constellation/PEARLIA.png" 
    },
       {
        name: "Lilithdev",
        description: "Lilith is a web developer and fandom dweller. She has a passion for recreating things she loves and trying new things in Javascript!",
        attributes: `✦ Will always do her best to help out
✦ Likes to learn new things
✦ Obsessive, will work on the same project for a month straight
✦ No artistic or design abilities, has been winging everything as close enough
✦ Negative social skills`,
inventory: [
    {
        img: "friends-items/scissors.PNG",
        name:  "scissors"
    },
    {
        img: "friends-items/pien.PNG",
        name:  "pien"
    },
    {
        img: "friends-items/phone.PNG",
        name:  "a cracked phone"
    },
    {
        img: "friends-items/stairs.PNG",
        name:  "waxed weathered cut copper stairs"
    },
    {
        img: "friends-items/amethyst.PNG",
        name: "amethyst"
    }
],
website: "Go check out the Lilithdev website!",
        websiteUrl: "https://lilithdev.neocities.org/",
        constellation: "friends-constellation/lilith.png" 
    },
];

class Particle {
    constructor(isSpecial = false, specialInfo = null, specialIndex = null) {
        this.x = ctx.canvas.width * Math.random();
        this.y = ctx.canvas.height * Math.random();
        this.vx = speed * 2 * Math.random() - speed;
        this.vy = speed * 2 * Math.random() - speed;
        this.connections = 0;
        this.radius = isSpecial ? radius * 4 : radius;
        this.isSpecial = isSpecial;
        this.specialInfo = specialInfo;
        this.specialIndex = specialIndex;
        this.isHovered = false;
    }

    draw(ctx) {
        ctx.beginPath();
        if (this.isSpecial) {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * (this.isHovered ? 2 : 1)
            );
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
            ctx.fillStyle = gradient;
            
            ctx.arc(this.x, this.y, this.radius * (this.isHovered ? 1.5 : 1), 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = '14px departure-mono';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 10;
            ctx.fillText(this.specialInfo.name, this.x, this.y + this.radius * 2);
            
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = "#FFFFFF";
            ctx.arc(this.x, this.y, this.radius * (this.isHovered ? 1.5 : 1), 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 + this.radius || this.x + this.radius > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy = -this.vy;
        }
    }

    isPointInside(x, y) {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return distance <= this.radius * (this.isSpecial ? 3 : 1);
    }
}

function dist(x1, x2, y1, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    particles.forEach(particle => {
        if (particle.isSpecial && particle.isPointInside(clickX, clickY)) {
            const starSoundElement = document.querySelector('#star-sound');
            if (starSoundElement) {
                starSoundElement.currentTime = 0;
                starSoundElement.play();
            }
            showInfo(particle.specialInfo);
        }
    });
});

function showInfo(info) {
    const clickSound = document.querySelector('#click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    blurOverlay.style.display = 'block';
    
    constellationImage.style.display = 'block';
    constellationImage.style.backgroundImage = `url(${info.constellation})`;
    setTimeout(() => {
        constellationImage.style.opacity = '1';
    }, 50);

    const content = `
    <button class="close-button" onclick="closeInfoPanel()">×</button>
    <h2>${info.name}</h2>
    
    <div class="star-tabs">
        <button class="star-tab active" onclick="switchStarTab(this, 'overview')">Overview</button>
        <button class="star-tab" onclick="switchStarTab(this, 'attributes')">Attributes</button>
        <button class="star-tab" onclick="switchStarTab(this, 'inventory')">Inventory</button>
        <button class="star-tab" onclick="switchStarTab(this, 'website')">Website</button>
    </div>

    <div class="star-tab-content active" id="overview">
        <p>${info.description}</p>
    </div>
    <div class="star-tab-content" id="attributes">
        <p>${info.attributes}</p>
    </div>
    <div class="star-tab-content" id="inventory">
        <div class="inventory-grid">
            ${info.inventory.map(item => `
                <div class="inventory-item">
                    <img src="${item.img}" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
            `).join('')}
        </div>
    </div>
    <div class="star-tab-content" id="website">
        <p>${info.website}</p>
        <a href="${info.websiteUrl}" target="_blank" class="website-link">Visit Website</a>
    </div>
`;
    infoPanel.innerHTML = content;
    infoPanel.style.display = 'block';
   
    requestAnimationFrame(() => {
        infoPanel.classList.add('visible');
    });
}

function closeInfoPanel() {
    const clickSound = document.querySelector('#click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    constellationImage.style.opacity = '0';
    infoPanel.classList.remove('visible');

    
    setTimeout(() => {
        constellationImage.style.display = 'none';
        blurOverlay.style.display = 'none';
        infoPanel.style.display = 'none';
    }, 300); 
}

function switchStarTab(tab, contentId) {
    const clickSound = document.querySelector('#click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    document.querySelectorAll('.star-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.star-tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(contentId).classList.add('active');
}

blurOverlay.addEventListener('click', (e) => {
    if (e.target === blurOverlay) {
        closeInfoPanel();
    }
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.connections = 0;
        particle.isHovered = particle.isSpecial && particle.isPointInside(mouseX, mouseY);
        if (particle.isHovered) {
            canvas.style.cursor = 'pointer';
        }
    });
    
    if (!particles.some(p => p.isHovered)) {
        canvas.style.cursor = 'default';
    }

    for (let i = 0; i < particles.length; i++) {
        let nearbyParticles = [];
        for (let j = 0; j < particles.length; j++) {
            if (i !== j) {
                const eachPartDist = dist(
                    particles[j].x,
                    particles[i].x,
                    particles[j].y,
                    particles[i].y
                );
                if (eachPartDist <= distance) {
                    nearbyParticles.push({index: j, distance: eachPartDist});
                }
            }
        }
        
        nearbyParticles.sort((a, b) => a.distance - b.distance);
        nearbyParticles = nearbyParticles.slice(0, maxConnections);
        
        for (const nearby of nearbyParticles) {
            const j = nearby.index;
            const eachPartDist = nearby.distance;
            
            if (particles[i].connections < maxConnections && 
                particles[j].connections < maxConnections) {
                
                const opacity = 1 - (eachPartDist / distance);
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
                ctx.lineWidth = lineWidth;
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                
                particles[i].connections++;
                particles[j].connections++;
            }
        }
        
        particles[i].update();
        particles[i].draw(ctx);
    }
    requestAnimationFrame(loop);
}

// Initialize particles
for (let i = 0; i < num_particles; i++) {
    if (i < specialParticles.length) {
        particles.push(new Particle(true, specialParticles[i], i));
    } else {
        particles.push(new Particle());
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
});

loop();