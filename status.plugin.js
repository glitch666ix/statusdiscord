//META{"name":"StatusLoop","displayName":"Status Loop","source":"https://raw.githubusercontent.com/glitch666ix/statusdiscord/main/status.plugin.js","website":"https://github.com/glitch666ix/statusdiscord"}*

class StatusLoop {
    constructor() {
        this.intervalId = null;
        this.states = ["online", "idle", "dnd"]; // Disponível, Ausente, Não Perturbe
        this.currentIndex = 0;
    }

    getName() { return "Status Loop"; }
    getDescription() { return "Alterna entre os estados de disponível, ausente e não perturbe em um loop."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "Glitch"; }

    start() {
        this.intervalId = setInterval(() => {
            this.setNextState();
        }, 5000); // Altera a cada 5 segundos
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    setNextState() {
        const nextState = this.states[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.states.length;
        this.setStatus(nextState);
    }

    setStatus(status) {
        const request = new XMLHttpRequest();
        request.open("PATCH", "/api/v9/users/@me/settings", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Authorization", window.localStorage.token.replace(/"/g, ""));
        request.send(JSON.stringify({ status }));
    }
}
