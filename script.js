 function initializePage() {
            const savedCategory = localStorage.getItem('activeCategory');
            if (savedCategory) {
                filterGames(savedCategory);
            } else {
                displayInitialGames();
            }
        }

        function displayInitialGames() {
            const gameBoxes = document.querySelectorAll('.game-box');
            const initialDisplayCount = 10;
        
            gameBoxes.forEach((box, index) => {
                box.style.display = (index < initialDisplayCount) ? 'flex' : 'none';
            });
        }

        function filterGames(category) {
            const gameBoxes = document.querySelectorAll('.game-box');
            const categoryLinks = document.querySelectorAll('.row-link');
        
            gameBoxes.forEach(box => {
                const categories = box.getAttribute('data-category').split(',').map(cat => cat.trim());
                box.style.display = (category === 'all' || categories.includes(category)) ? 'flex' : 'none';
            });
        
            updateActiveCategory(category, categoryLinks);
        }

        function updateActiveCategory(category, categoryLinks) {
            categoryLinks.forEach(link => {
                const parentTh = link.parentNode;
                if (link.getAttribute('data-category') === category) {
                    link.classList.add('active');
                    parentTh.classList.add('active');
                } else {
                    link.classList.remove('active');
                    parentTh.classList.remove('active');
                }
            });
        }

        function filterBySearch(searchText) {
            const gameBoxes = document.querySelectorAll('.game-box');
        
            gameBoxes.forEach(box => {
                const title = box.querySelector('.game-title').textContent;
                box.style.display = title.includes(searchText) ? 'flex' : 'none';
            });

            document.querySelectorAll('.row-link').forEach(link => {
                link.classList.remove('active');
                link.parentNode.classList.remove('active');
            });
        
            localStorage.removeItem('activeCategory');
        }

        function toggleLoginForm() {
            const loginForm = document.getElementById('loginForm');
            loginForm.style.display = (loginForm.style.display === 'block') ? 'none' : 'block';
        }

        document.addEventListener('DOMContentLoaded', () => {
            initializePage();
        
            const categoryLinks = document.querySelectorAll('.row-link');
            categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const selectedCategory = link.getAttribute('data-category');
                    filterGames(selectedCategory);
                    document.getElementById('searchBar').value = '';
                });
            });
        
            document.getElementById('searchBar').addEventListener('input', (e) => {
                filterBySearch(e.target.value);
            });
        
            document.querySelectorAll('.icon-img').forEach(img => {
                if (img.src.includes('avatar.png')) {
                    img.addEventListener('click', toggleLoginForm);
                }
            });
        });
        