// 'use strict';
//
// // ACTIVE CLASS для навігації
// document.addEventListener("DOMContentLoaded", () => {
//     const currentPage = window.location.pathname.split("/").pop();
//
//     document.querySelectorAll(".navigation a").forEach(link => {
//         if (link.getAttribute("href") === currentPage) {
//             link.classList.add("active");
//         }
//     });
// });
//
// // ACTIVE CLASS при скролінгу
// document.addEventListener("scroll", () => {
//     const portfolioSection = document.getElementById("portfolio");
//     const portfolioLink = document.querySelector('.navigation a[href="#portfolio"]');
//
//     // Перевіряємо, чи портфоліо в полі зору
//     const rect = portfolioSection.getBoundingClientRect();
//     const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
//
//     // Додаємо або прибираємо активний клас
//     if (isInView) {
//         portfolioLink.classList.add("active");
//     } else {
//         portfolioLink.classList.remove("active");
//     }
// });
