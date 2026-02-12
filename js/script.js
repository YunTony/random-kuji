function analyze() {

    const prizes = {
        A: { count: parseInt(A_count.value) || 0, value: parseInt(A_value.value) || 0 },
        B: { count: parseInt(B_count.value) || 0, value: parseInt(B_value.value) || 0 },
        C: { count: parseInt(C_count.value) || 0, value: parseInt(C_value.value) || 0 },
        D: { count: parseInt(D_count.value) || 0, value: parseInt(D_value.value) || 0 }
    };

    const n = parseInt(try_count.value) || 0;

    let total = 0;
    for (let g in prizes) {
        total += prizes[g].count;
    }

    if (total === 0) {
        output.innerHTML = "남은 티켓이 없습니다.";
        return;
    }

    let EV = 0;
    let resultHTML = "<b>🎯 1회 당첨 확률</b><br>";

    for (let g in prizes) {
        const p = prizes[g].count / total;
        resultHTML += `${g}상: ${(p*100).toFixed(2)}%<br>`;
        EV += p * prizes[g].value;
    }

    const pA = prizes.A.count / total;
    const atLeastOne = 1 - Math.pow(1 - pA, n);

    // 시뮬레이션
    let pool = [];
    for (let g in prizes) {
        for (let i = 0; i < prizes[g].count; i++) {
            pool.push(g);
        }
    }

    let simResult = {};
    let tempPool = [...pool];

    for (let i = 0; i < n && tempPool.length > 0; i++) {
        const idx = Math.floor(Math.random() * tempPool.length);
        const draw = tempPool.splice(idx, 1)[0];
        simResult[draw] = (simResult[draw] || 0) + 1;
    }

    resultHTML += `<br><b>💰 기대값 (1회 평균 가치)</b>: ${EV.toFixed(0)}원<br>`;
    resultHTML += `<br><b>🔥 ${n}회 중 A상 1번 이상 확률</b>: ${(atLeastOne*100).toFixed(2)}%<br><br>`;

    resultHTML += "<b>🎲 시뮬레이션 결과</b><br>";
    for (let g in simResult) {
        resultHTML += `${g}상 ${simResult[g]}개<br>`;
    }

    output.innerHTML = resultHTML;
}
