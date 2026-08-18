export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "left",
  light = false,
  action,
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14`}>
      <div className={`flex flex-col ${alignCls} max-w-2xl`}>
        {eyebrow && (
          <span className={`eyebrow mb-3 ${light ? "text-gold-light" : "text-sun-600"}`}>
            {eyebrow}
          </span>
        )}
        <h2
          className={`font-display font-semibold text-[32px] sm:text-[40px] leading-[1.12] ${
            light ? "text-white" : "text-navy-800"
          }`}
        >
          {title}
        </h2>
        {desc && (
          <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-navy-100/85" : "text-navy-600/80"}`}>
            {desc}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
