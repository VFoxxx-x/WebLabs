const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.value = 0.3;
    oscillator.start();
    setTimeout(() => oscillator.stop(), duration);
}

export const playCorrectSound = (): void => {
    playTone(880, 200);
};

export const playWrongSound = (): void => {
    playTone(220, 300);
};

export const playRecordSound = (): void => {
    playTone(660, 150);
    setTimeout(() => playTone(880, 200), 160);
};