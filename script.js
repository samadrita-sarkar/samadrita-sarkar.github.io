// Rotating text functionality
const rotatingText = document.getElementById('rotating-text');
const texts = [
    "full-time nerd",
    "cat mom",
    "saree enthusiast",
    "bookbinder",
    "crocheter",
    "shower singer"
];
let currentIndex = 0;

function updateText() {
    rotatingText.style.opacity = '0';
    setTimeout(() => {
        rotatingText.textContent = texts[currentIndex];
        rotatingText.style.opacity = '1';
        currentIndex = (currentIndex + 1) % texts.length;
    }, 500); // Half of the total transition time
}

// Initial call
updateText();
// Set interval for text rotation (3 seconds)
setInterval(updateText, 3000);

// Draggable functionality
const draggableBoxes = document.querySelectorAll('.drag-box');

draggableBoxes.forEach(box => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    box.addEventListener('mousedown', dragStart);
    box.addEventListener('mousemove', drag);
    box.addEventListener('mouseup', dragEnd);
    box.addEventListener('mouseleave', dragEnd);
    box.addEventListener('touchstart', dragStart);
    box.addEventListener('touchmove', drag);
    box.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === box) {
            isDragging = true;
            box.style.cursor = 'grabbing';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, box);
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        box.style.cursor = 'grab';
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
});

// Optional: Add smooth parallax effect to boxes on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    draggableBoxes.forEach(box => {
        if (!box.classList.contains('dragging')) {
            const rect = box.getBoundingClientRect();
            const boxX = rect.left / window.innerWidth;
            const boxY = rect.top / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            box.style.transition = 'transform 0.3s ease-out';
            box.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});