import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

export const TimeCounter = () => {

    function getTimeLeft() {
        const targetDate = new Date("2025-05-17T00:00:00");
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0 };
        }

        const totalMinutes = Math.floor(difference / (1000 * 60));
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        return {
            days: totalDays,
            hours: totalHours,
            minutes: totalMinutes
        };
    }

    // Функция для обновления DOM
    function updateCountdown() {
        const countdown = getTimeLeft();

        document.querySelector(".js-about-time__day").textContent = countdown.days;
        document.querySelector(".js-about-time__hour").textContent = countdown.hours;
        document.querySelector(".js-about-time__minute").textContent = countdown.minutes;
    }

    // Запускаем таймер
    updateCountdown(); // Чтобы значения сразу обновились при загрузке
    setInterval(updateCountdown, 1000); // Обновление каждую секунду
}

export const AnimationHands = () => {

    // Регистрация плагина ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const leftHand = document.querySelector(".js-left-hand");
    const rightHand = document.querySelector(".js-right-hand");

    if (leftHand && rightHand) {

        gsap.fromTo(leftHand,
                { x: 0, y: 0 },   // Начальная позиция (по умолчанию)
                {
                    x: 20,        // Движение вправо
                    y: -10,       // Движение вверх
                    scale: 1.1,
                    onUpdate: () => leftHand.classList.add('isBlur'),
                    onComplete: () => leftHand.classList.remove('isBlur'),
                    scrollTrigger: {
                        trigger: ".js-wrapper", // Элемент, который запускает анимацию
                        start: "bottom bottom", // Начало анимации при попадании .js-wrapper в зону видимости
                        end: "bottom center", // Конец анимации, когда .container полностью прокручивается
                        scrub: true // Плавная привязка к прокрутке
                    }
                }
        );

        gsap.fromTo(rightHand,
                { x: 0, y: 0 },   // Начальная позиция (по умолчанию)
                {
                    x: -15,        // Движение влево
                    y: 20,       // Движение вниз
                    scale: 1.1,
                    onUpdate: () => rightHand.classList.add('isBlur'),
                    onComplete: () => rightHand.classList.remove('isBlur'),
                    scrollTrigger: {
                        trigger: ".js-wrapper",
                        start: "bottom bottom",
                        end: "bottom center",
                        scrub: true
                    }
                }
        );

        gsap.to(leftHand, {
            rotation: 3, // Лёгкое покачивание
            repeat: -1,  // Бесконечное повторение
            yoyo: true,  // Анимация идёт туда-обратно
            duration: 2
        });

        gsap.to(rightHand, {
            rotation: -3,
            repeat: -1,
            yoyo: true,
            duration: 2
        });

        gsap.to(".js-background", {
            y: -5, // Движение фона вверх (медленно)
            scrollTrigger: {
                trigger: ".js-wrapper",
                start: "bottom bottom",
                end: "bottom center",
                scrub: 1 // Плавность
            }
        });
    }
}
