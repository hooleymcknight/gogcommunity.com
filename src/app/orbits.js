'use client';
import Image from "next/image";
import Link from "next/link";
import '../styles/orbits.css';

const nodeArrangement = {
    "1": [15, 208, 108, 320],
    "2": [105, 28, 18, 172],
    "3": [69, 280, 145, 76]
}

const swapActiveElements = (prevEl, newEl) => {
    prevEl.classList.remove('active');
    newEl.classList.add('active');
}

const arrangeOtherNodes = (activeNode) => {
    let arrangement = nodeArrangement[`${activeNode}`];

    Array.from(document.querySelectorAll('.orbit-container .mini-node')).forEach((miniNode, index) => {
        miniNode.style = `--rotation: ${arrangement[index]}deg`;
    });
}

export default function Orbits() {
    const handleNodeHover = (e) => {
        if (e.target.closest('.active.node')) return;
        const mainOrbit = e.target.closest('.main-orbit');
        const newActiveNode = e.target.closest('.node');
        const prevActiveNode = mainOrbit.querySelector('.active');
        const prevActiveText = mainOrbit.querySelector('.orbit-menu-item.active');
        const newActiveText = mainOrbit.querySelector(`.orbit-menu-item[data-node="${newActiveNode.dataset.node}"]`);

        swapActiveElements(prevActiveNode, newActiveNode);
        swapActiveElements(prevActiveText, newActiveText);
        arrangeOtherNodes(newActiveNode.dataset.node);
    }

    const handleNodeTextHover = (e) => {
        const mainOrbit = e.target.closest('.main-orbit');
        const thisNode = e.target.closest('.orbit-menu-item').dataset.node;
        const correspondingNode = mainOrbit.querySelector(`.node[data-node="${thisNode}"]`);
        const prevActiveNode = mainOrbit.querySelector('.active');
        const prevActiveText = mainOrbit.querySelector('.orbit-menu-item.active');
        const newActiveText = mainOrbit.querySelector(`.orbit-menu-item[data-node="${correspondingNode.dataset.node}"]`);

        swapActiveElements(prevActiveNode, correspondingNode);
        swapActiveElements(prevActiveText, newActiveText);
        arrangeOtherNodes(correspondingNode.dataset.node);
    }

  return (
    <div className="orbit-container">
        <Image
            className="center-orbit"
            src="/GoG-logo.svg"
            alt="GoG Community logo"
            style={{ "--full-orbit": "180px" }}
            width={180}
            height={38}
            priority
        />
        <div className="orbit thin-orbit" style={{ "--full-orbit": "190px" }}></div>

        <div className="orbit thick-orbit" style={{ "--full-orbit": "200px" }}></div>

        <div className="orbit dotted-orbit" style={{ "--full-orbit": "290px" }}>
            <div className="mini-node" style={{ "--rotation": "15deg" }}></div>
        </div>

        <div className="orbit thin-orbit" style={{ "--full-orbit": "320px" }}>
            <div className="mini-node" style={{ "--rotation": "208deg" }}></div>
        </div>

        {/* MAIN ORBIT!! */}
        <div className="orbit main-orbit" style={{ "--full-orbit": "530px" }}>
            <Link href="/events" className="node active" style={{ transform: "rotate(30deg)", }} data-node="1" onMouseEnter={(e) => {handleNodeHover(e)}}></Link>
            <Link href="/contact" className="node" style={{ transform: "rotate(150deg)", }} data-node="2" onMouseEnter={(e) => {handleNodeHover(e)}}></Link>
            <Link href="/about" className="node" style={{ transform: "rotate(270deg)", }} data-node="3" onMouseEnter={(e) => {handleNodeHover(e)}}></Link>

            <Link href="/events" className="orbit-menu-item active left-item" data-node="1" onMouseEnter={(e) => {handleNodeTextHover(e)}}>Events</Link>
            <Link href="/contact" className="orbit-menu-item right-item" data-node="2" onMouseEnter={(e) => {handleNodeTextHover(e)}}>Contact</Link>
            <Link href="/about" className="orbit-menu-item bottom-item" data-node="3" onMouseEnter={(e) => {handleNodeTextHover(e)}}>About</Link>
        </div>

        <div className="orbit dotted-orbit" style={{ "--full-orbit": "900px" }}></div>

        <div className="orbit thin-orbit" style={{ "--full-orbit": "930px" }}>
            <div className="mini-node" style={{ "--rotation": "108deg" }}></div>
            <div className="mini-node" style={{ "--rotation": "320deg" }}></div>
        </div>

        <div className="orbit dotted-orbit" style={{ "--full-orbit": "990px" }}></div>
    </div>
  );
}
