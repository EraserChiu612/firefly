class Firefly {
    constructor(_element, _mouseX = 0, _mouseY = 0, _ballX = 0, _ballY = 0, _diameter) {
        this.element = _element;
        this.mouseX = _mouseX;
        this.mouseY = _mouseY;
        this.diameter = _diameter;
        this.ballX = _ballX;
        this.ballY = _ballY;

        this.strength = .05;
        this.drag = .5;
    }

    static getCssValue(element, cssName) {
        const root_style = getComputedStyle(element);
        return root_style.getPropertyValue(cssName);

    }

    static convertToFirefly(x, d) {
        x = x - d / 2;
        return x;
    }

    delayMotion() {
        let distance_x = this.mouseX - this.ballX;
        distance_x *= this.strength;
        this.ballX += distance_x;
        let distance_y = this.mouseY - this.ballY;
        distance_y *= this.strength;
        this.ballY += distance_y;
        let pos_x = Firefly.convertToFirefly(this.ballX, this.diameter);
        let pos_y = Firefly.convertToFirefly(this.ballY, this.diameter);

        this.element.style.transform = `translate(${pos_x}px,${pos_y}px)`;

        for (const halo of halos) {
            let factor = Firefly.getCssValue(halo, '--factor');
            let scaler = distance_x + distance_y;
            halo.style.transform = `scale(${factor * scaler * this.drag})`;
        }

        requestAnimationFrame(this.delayMotion.bind(this));
    }
}