        function startExperience() {
            const entry = document.getElementById('entry-screen');
            entry.style.opacity = '0';
            setTimeout(() => { entry.style.display = 'none'; }, 1000);

            const card = document.getElementById('main-card');
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; }, 100);
        }