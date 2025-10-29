export default function SheetPreview({ cards }) {
  const cardWidthMm = 63;
  const cardHeightMm = 88;

  return (
    <div className="print-area w-[210mm] h-[297mm] border p-4 flex flex-wrap gap-2 content-start">
      {cards.map((card, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2" style={{ width: `${cardWidthMm}mm` }}>
          <img src={card.front} alt="frente" style={{ width: "63mm", height: "88mm" }} />
          <img src={card.back} alt="verso" style={{ width: "63mm", height: "88mm" }} />
        </div>
      ))}
    </div>
  );
}
