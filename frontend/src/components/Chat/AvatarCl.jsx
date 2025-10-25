export default function Avatar({ username, userId, isOnline, avatarLink }) {
  const colors = [
    "#90CDF4", "#F56565", "#D6BCFA", "#BC85E0", "#7F9CF5",
    "#F6AD55", "#F687B3", "#68D391", "#FBBF24", "#4299E1",
  ];

  // Generate color from userId
  const userIdBase10 = parseInt(userId?.substring(10) || "0", 16);
  const colorIndex = userIdBase10 % colors.length;
  const bgColor = colors[colorIndex];

  const placeholderInitial = username ? username[0].toUpperCase() : "?";

  return (
    <div className="relative inline-block w-11 h-11 rounded-full overflow-hidden">
      {avatarLink ? (
        <img
          src={avatarLink}
          alt={placeholderInitial}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex justify-center items-center text-white font-semibold text-lg uppercase"
          style={{ backgroundColor: bgColor, textShadow: "0.4px 0.4px 2px rgba(0,0,0,0.3)" }}
        >
          {placeholderInitial}
        </div>
      )}

      {/* Optional: online status dot */}
      {/* {isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      )} */}
    </div>
  );
}