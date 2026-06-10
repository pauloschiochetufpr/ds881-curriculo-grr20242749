import React, { useState, useEffect } from 'react';
import './App.css';

const ME_TXT_CONTENT = `Este arquivo é sobre mim. :D

Meu nome é Paulo Schiochet, sou um desenvolvedor brasileiro, atualmente cursando análise e desenvolvimento de sistemas na UFPR. Tenho 23 anos.

Tenho uma grande paixão por tecnologia desde novo. Com meu primeiro contato na programação sendo aos 13 anos de idade com python fazendo scripts.

Atualmente, faço projetos pequenos de forma freelancer, com desenvolvimento web como forma de renda.

Estou aberto para contato, me chame: prgbschiochet@gmail.com
Veja meu github também: github.com/pauloschiochetufpr`;


const Icons = {
  internet: 'msie.png',
  github: 'github.png',
  meTxt: 'notepad_file.png',
  myPc: 'computer.png',
  folder: 'directory_closed.png',
  bin: 'recycle_bin_empty.png'
};

function IconDisplay({ iconName, title, href, x, y, onIconClicked }) {
  const xPosition = 15 + x * 50;
  const yPosition = 15 + y * 75;

  const handleClick = (e) => {
    if (onIconClicked) {
      onIconClicked(e);
    }
  };

  return (
    <a 
      href={href || "#"} 
      target={href ? "_blank" : undefined} 
      rel="noreferrer" 
      onClick={handleClick}
      style={{ textDecoration: "none", cursor: "pointer" }}
    >
      <div
        className="icon-display-container"
        style={{
          zIndex: "1000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          flexDirection: "column",
          textAlign: "center",
          width: "50px",
          height: "50px",
          left: `${xPosition}px`,
          top: `${yPosition}px`,
          cursor: "pointer"
        }}
      >
        <img 
          src={`icons/${Icons[iconName]}`} 
          style={{ width: "32px", height: "32px", imageRendering: "pixelated" }} 
          alt={title} 
        />
        <span style={{ fontSize: "10px", color: "white", fontFamily: "monospace", display: "block", marginTop: "2px" }}>
          {title}
        </span>
      </div>
    </a>
  );
}

function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="date-time-container">
      <span style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}>
        {currentDate.toLocaleTimeString()}
      </span>
      <span style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}>
        {currentDate.toLocaleDateString('pt-BR')}
      </span>
    </div>
  );
}

function NotepadWindow({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="notepad-window">
      <div className="window-header">
        <div className="window-title-container">
          <img src="icons/notepad_file.png" className="window-title-icon" alt="notepad" />
          <span className="window-title">me.txt - Bloco de Notas</span>
        </div>
        <div className="window-controls">
          <button className="window-control-btn close-btn" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="window-menus">
        <span>Arquivo</span>
        <span>Editar</span>
        <span>Formatar</span>
        <span>Exibir</span>
        <span>Ajuda</span>
      </div>
      <div className="window-body">
        <textarea 
          className="notepad-textarea" 
          readOnly 
          value={ME_TXT_CONTENT}
        />
      </div>
    </div>
  );
}

function App() {
  const [isScreenTurnedOn, setIsScreenTurnedOn] = useState(false);
  const [floppyActivity, setFloppyActivity] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const wrapper = document.querySelector('.retro-setup-wrapper');
      if (!wrapper) return;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      
      const baseWidth = 1040;
      const baseHeight = 1020;
      
      const scaleX = winWidth / baseWidth;
      const scaleY = winHeight / baseHeight;
      const scale = Math.min(scaleX, scaleY, 1.1);
      
      wrapper.style.transform = `scale(${scale})`;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleScreen = () => {
    setIsScreenTurnedOn(!isScreenTurnedOn);
  };

  const handleFloppyEject = () => {
    setFloppyActivity(true);
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio Context error', e);
    }
    setTimeout(() => {
      setFloppyActivity(false);
      alert('Floppy disk ejected!');
    }, 600);
  };

  return (
    <div className="main" id="computer-main">
      <div className="retro-setup-wrapper">
        
        {!isScreenTurnedOn && (
          <div className="lock-computer-crt-container">
            <img className="glitch-screen-effect" src="icons/glitch.gif" alt="scanlines" />
            <div className="out-light"></div>
            <div className="shadow"></div>
            <div className="lock-computer-screen-container"></div>
          </div>
        )}

        <div className="computer-crt-container">
          <div className="computer-screen-container">
            {!isScreenTurnedOn ? (
              <div className="computer-screen">
                <img 
                  className="computer-screen-background" 
                  src="icons/bliss.jpg" 
                  style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }} 
                  alt="wallpaper" 
                />

                <div
                  className="computer-screen-icons-container"
                  style={{ position: "absolute", width: "800px", height: "562px" }}
                >
                  <IconDisplay 
                    iconName="internet" 
                    title="internet" 
                    x={0} 
                    y={0} 
                    onIconClicked={(e) => e.preventDefault()} 
                  />
                  <IconDisplay 
                    iconName="github" 
                    title="github" 
                    x={0} 
                    y={5} 
                    href="https://github.com/pauloschiochetufpr" 
                  />
                  <IconDisplay 
                    iconName="meTxt" 
                    title="me.txt" 
                    x={3} 
                    y={3} 
                    onIconClicked={(e) => { 
                      e.preventDefault(); 
                      setIsNotepadOpen(true);
                    }} 
                  />
                  <IconDisplay 
                    iconName="myPc" 
                    title="myPc" 
                    x={14.5} 
                    y={1} 
                    onIconClicked={(e) => { e.preventDefault(); alert("Meu Computador\nCPU: i486 DX4 @ 99MHz\nRAM: 16 MB\nHard Disk: 540 MB\nFloppy Drive: 3.5\""); }} 
                  />
                  <IconDisplay 
                    iconName="folder" 
                    title="folder" 
                    x={14.5} 
                    y={2} 
                    onIconClicked={(e) => e.preventDefault()} 
                  />
                  <IconDisplay 
                    iconName="bin" 
                    title="bin" 
                    x={14.5} 
                    y={6.5} 
                    onIconClicked={(e) => e.preventDefault()} 
                  />
                </div>

                <NotepadWindow isOpen={isNotepadOpen} onClose={() => setIsNotepadOpen(false)} />

                <div className="computer-taskbar-container">
                  <div className="start-button-mock">
                    <span>🏁 Start</span>
                  </div>
                  <div className="taskbar-divider-mock"></div>
                  <div className="taskbar-tabs-mock">
                    <div className="taskbar-tab-mock active">
                      <span>Currículo.exe</span>
                    </div>
                  </div>
                  <Clock />
                </div>
                
                <div style={{ display: "flex", position: "absolute", bottom: "48px", left: "10px", fontSize: "12px", fontWeight: "bold", color: "white", textShadow: "1px 1px 1px #000" }}>
                  pauloschiochet ©
                </div>
              </div>
            ) : (
              <div className="computer-screen" style={{ backgroundColor: "black" }} />
            )}
          </div>

          <div className="computer-button-container">
            <div className="computer-button-light" style={!isScreenTurnedOn ? {} : { backgroundColor: "red", boxShadow: "0px 0px 25px 1px red" }}></div>
            <button className="computer-button" onClick={handleToggleScreen}></button>
          </div>
        </div>

        <div className="computer-stand"></div>

        <div className="computer-case">
          <div className="computer-diskhat-container" style={{ height: "100%", width: "100%" }}>
            <div className="computer-diskhat">
              <div className="computer-diskhat-input-container">
                <div className="computer-diskhat-input">
                  <div className="computer-diskhat-input-2"></div>
                </div>
                <div className="computer-diskhat-button-container" style={{ height: "100px", width: "300px", position: "absolute" }}>
                  <div className={`floppy-led-dot ${floppyActivity ? 'active' : 'off'}`}></div>
                  <button className="computer-diskhat-button" onClick={handleFloppyEject}></button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", paddingTop: "30px" }}>
            <div className="computer-turn-button-container">
              <button className="computer-turn-button" onClick={handleToggleScreen}></button>
            </div>
            <div className="computer-case-fans-container">
              <img src="icons/fans.png" style={{ width: "279px", height: "80px" }} alt="fans" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
