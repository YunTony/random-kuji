let grades = ["A", "B", "C", "D"];

function renderGrades() {
    const container = document.getElementById("grade-container");
    const priorityContainer = document.getElementById("priority-container");

    container.innerHTML = "";
    priorityContainer.innerHTML = "";

    grades.forEach(grade => {
        container.innerHTML += `
            <div class="grade-row">
                <strong>${grade}상</strong>

                <button onclick="decrease('${grade}')">-</button>
                <input type="number" id="${grade}_count" value="1" min="0">
                <button onclick="increase('${grade}')">+</button>
            </div>
        `;

        priorityContainer.innerHTML += `
            <label>
                <input type="checkbox" value="${grade}" checked>
                ${grade}상
            </label><br>
        `;
    });
}

function increase(grade) {
    const input = document.getElementById(`${grade}_count`);
    input.value = parseInt(input.value || 0) + 1;
}

function decrease(grade) {
    const input = document.getElementById(`${grade}_count`);
    let value = parseInt(input.value || 0);
    if (value > 0) {
        input.value = value - 1;
    }
}

function addGrade() {
    const newGrade = prompt("추가할 등급 이름 입력 (예: E)");
    if (newGrade && !grades.includes(newGrade)) {
        grades.push(newGrade);
        renderGrades();
    }
}

function analyze() {

    const price = parseInt(document.getElementById("price").value) || 0;
    const n = parseInt(document.getElementById("try_count").value) || 0;

    let total = 0;
    let counts = {};

    grades.forEach(g => {
        const count = parseInt(document.getElementById(`${g}_count`).value) || 0;
        counts[g] = count;
        total += count;
    });

    if (total === 0) {
        output.innerHTML = "남은 티켓이 없습니다.";
        return;
    }

    const selected = [...document.querySelectorAll("#priority-container input:checked")]
        .map(cb => cb.value);

    let priorityTotal = 0;
    selected.forEach(g => {
        priorityTotal += counts[g] || 0;
    });

    const p = priorityTotal / total;
    const expectedWins = n * p;
    const atLeastOne = 1 - Math.pow(1 - p, n);
    const totalCost = price * n;

    output.innerHTML = `
        🎯 1회 상위상 확률: ${(p*100).toFixed(2)}%<br><br>
        🔥 ${n}회 플레이 시 상위상 기대 횟수: ${expectedWins.toFixed(2)}개<br><br>
        💥 ${n}회 중 1번 이상 상위상 확률: ${(atLeastOne*100).toFixed(2)}%<br><br>
        💰 총 지출 금액: ${totalCost.toLocaleString()}원
    `;
}

renderGrades();
