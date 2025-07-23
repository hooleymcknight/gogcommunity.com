'use client';
import '../styles/about.css';
import { useEffect } from "react";

let eyeWatchInit = false;

const getOffset = (element) => {
    if (!element.getClientRects().length) {
        return { top: 0, left: 0 };
    }

    let rect = element.getBoundingClientRect();
    let win = element.ownerDocument.defaultView;

    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}

export default function Eyeball() {

    useEffect(() => {
        if (!eyeWatchInit) {
            const eyeball = document.querySelector('.eyeball');

            document.documentElement.addEventListener('mousemove', (e) => {
                // if mouse is hovering OVER the eyeball-- just go wide-eyed
                const eyeContainer = e.target.closest('.eye-container');
                if (eyeContainer) {
                    eyeContainer.classList.add('panicking');
                }
                else {
                    document.querySelector('.eye-container').classList.remove('panicking');
                }

                var x = (getOffset(eyeball).left) + (eyeball.clientWidth / 2);
                var y = (getOffset(eyeball).top) + (eyeball.clientHeight / 2);
                var rad = Math.atan2(e.pageX - x, e.pageY - y);
                var rot = (rad * (180 / Math.PI) * -1) - 90;
                const styles = {
                    '-webkit-transform': 'rotate(' + rot + 'deg)',
                    '-moz-transform': 'rotate(' + rot + 'deg)',
                    '-ms-transform': 'rotate(' + rot + 'deg)',
                    'transform': 'rotate(' + rot + 'deg)'
                }
                // Object.assign(eyeball.style, styles);
                let stylesText = '';
                Object.keys(styles).forEach((key) => {
                    stylesText += `${key}: ${styles[key]}; `;
                });
                // console.log(stylesText)
                eyeball.style.cssText = stylesText;
            });
            eyeWatchInit = true;
        }
    }, []);

    return (
        <div className="eye-container">
            <div className="eyeball"></div>
        </div>
    );
}