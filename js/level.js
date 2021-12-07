const levelMeter = [30, sky0_list.length, 50, sky2_list.length, 70, sky4_list.length];
let levelBoundary = [levelMeter[0]];

const levelDesign = {
    stage1: {
        star: [0.4, 0.02, 0.01],
        obstacle: [0.2],
        scrollInterval: 2500,
    },
    stage2: {
        star: [0.3, 0.05, 0.02],
        obstacle: [0.3],
        scrollInterval: 2000,
    },
    stage3: {
        star: [0.3, 0.1, 0.05],
        obstacle: [0.4],
        scrollInterval: 1800,
    },
    stage4: {
        star: [0.2, 0.2, 0.1],
        obstacle: [0.5],
        scrollInterval: 1500,
    },
}