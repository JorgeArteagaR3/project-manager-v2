const CircularProgress = ({
    strokeWidth,
    percentage,
}: {
    strokeWidth: number;
    percentage: number;
}) => {
    const radius = 50 - strokeWidth / 2;
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
        stroke: "#86efac",
        strokeDasharray: `${diameter}px ${diameter}px`,
        strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
    };

    return (
        <svg viewBox="0 0 100 100" width={24} height={24}>
            <path
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={{
                    stroke: "#111219",
                }}
            />

            <path
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                strokeLinecap="round"
                style={progressStyle}
            />
        </svg>
    );
};
export default CircularProgress;
