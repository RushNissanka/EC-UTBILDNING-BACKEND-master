document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            const content = this.nextElementSibling;
            if (isExpanded) {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }

            // Optionally, close other open accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.getAttribute('aria-expanded') === 'true') {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.style.display = "none";
                }
            });
        });
    });
});
