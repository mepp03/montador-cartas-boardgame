import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Componente para 9 cartas (63x88)
const NineCardsApp = ({ onImageAdd, pages }) => {
  const cardStyle = (type) =>
    `relative w-[63mm] h-[88mm] bg-white flex items-center justify-center overflow-hidden cursor-pointer group ${
      type === "back" ? "border border-gray-300 border-[0.3px]" : ""
    }`;

  const getCardOffset = (index) => {
    switch (index) {
      case 0:
        return "ml-[3mm] mr-[0mm]";
      case 1:
        return "ml-[3mm] mr-[0mm]";
      case 2:
        return "ml-[3mm] mr-[0mm]";
      case 3:
        return "ml-[1mm] mr-[5mm]";
      case 4:
        return "ml-[1mm] mr-[3mm]";
      case 5:
        return "ml-[3mm] mr-[0mm]";
      case 6:
        return "ml-[0mm] mr-[5mm]";
      case 7:
        return "ml-[1mm] mr-[3mm]";
      case 8:
        return "ml-[2mm] mr-[0mm]";
      default:
        return "";
    }
  };

  const getCardNumber = (index, pageType) => {
    if (pageType === "front") {
      return index + 1;
    } else {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const mirroredCol = 2 - col;
      return row * 3 + mirroredCol + 1;
    }
  };

  return (
    <div className="NineCardsApp">
      <div className="space-y-[20mm]">
        {pages.map((page, pageIdx) => (
          <div
            key={`page-${pageIdx}`}
            className={`nine-sheet-${pageIdx} w-[210mm] h-[297mm] bg-white flex justify-center items-center p-[10mm] mx-auto shadow-lg relative`}
            style={
              page.type === "front"
                ? {
                    transform: "rotate(-0.7deg)",
                    transformOrigin: "center center",
                  }
                : {}
            }
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium">
              Página {Math.floor(pageIdx / 2) + 1} -{" "}
              {page.type === "front" ? "Frente" : "Verso"}
            </div>

            <div className="grid grid-cols-3 grid-rows-3">
              {page.cards.map((img, i) => (
                <div
                  key={`${page.type}-${i}`}
                  className={`${cardStyle(page.type)} ${
                    page.type === "front" ? getCardOffset(i) : ""
                  }`}
                  onClick={() => onImageAdd(i, pageIdx)}
                >
                  {/* Número da carta no hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center z-10">
                    <span className="text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {getCardNumber(i, page.type)}
                    </span>
                  </div>

                  {img ? (
                    <img
                      src={img}
                      alt={`${page.type === "front" ? "Frente" : "Verso"} ${
                        i + 1
                      }`}
                      className="w-[90%] h-[90%] object-fill relative z-0"
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-4 relative z-0">
                      <div className="text-lg font-semibold">
                        {page.type === "front" ? "Frente" : "Verso"}{" "}
                        {getCardNumber(i, page.type)}
                      </div>
                      <div className="text-sm mt-2">Clique para adicionar</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-green-600 text-sm">
        <p>Dica: Exporte como PDF para imprimir em tamanho real (100% scale)</p>
        <p>Tamanho das cartas: 63mm × 88mm | Folha A4: 297mm × 210mm</p>
        <p>9 cartas por página (3 fileiras × 3 colunas)</p>
        <p className="mt-2 font-medium">
          Total:{" "}
          {pages
            .filter((p) => p.type === "front")
            .reduce(
              (total, page) => total + page.cards.filter(Boolean).length,
              0,
            )}{" "}
          cartas em {pages.length / 2} páginas
        </p>
      </div>
    </div>
  );
};

// Componente para 12 cartas (63x63)
const TwelveCardsApp = ({ onImageAdd, pages }) => {
  const cardStyle = (type) =>
    `relative w-[63mm] h-[63mm] bg-white flex items-center justify-center overflow-hidden cursor-pointer group ${
      type === "back" ? "border border-gray-300 border-[0.3px]" : ""
    }`;

  const getCardOffset = (index) => {
    switch (index) {
      case 0:
        return "ml-[2mm] mr-[0mm]";
      case 1:
        return "ml-[2mm] mr-[0mm]";
      case 2:
        return "ml-[2mm] mr-[0mm]";
      case 3:
        return "ml-[2mm] mr-[0mm]";
      case 4:
        return "ml-[2mm] mr-[0mm]";
      case 5:
        return "ml-[2mm] mr-[0mm]";
      case 6:
        return "ml-[2mm] mr-[0mm]";
      case 7:
        return "ml-[2mm] mr-[0mm]";
      case 8:
        return "ml-[2mm] mr-[0mm]";
      case 9:
        return "ml-[2mm] mr-[0mm]";
      case 10:
        return "ml-[2mm] mr-[0mm]";
      case 11:
        return "ml-[2mm] mr-[0mm]";
      default:
        return "";
    }
  };

  const getCardNumber = (index, pageType) => {
    if (pageType === "front") {
      return index + 1;
    } else {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const mirroredCol = 2 - col;
      return row * 3 + mirroredCol + 1;
    }
  };

  return (
    <div className="TwelveCardsApp">
      <div className="space-y-[20mm]">
        {pages.map((page, pageIdx) => (
          <div
            key={`page-${pageIdx}`}
            className={`twelve-sheet-${pageIdx} w-[210mm] h-[297mm] bg-white flex justify-center items-center p-[10mm] mx-auto shadow-lg relative`}
            style={
              page.type === "front"
                ? {
                    transform: "rotate(-0.7deg)",
                    transformOrigin: "center center",
                  }
                : {}
            }
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium">
              Página {Math.floor(pageIdx / 2) + 1} -{" "}
              {page.type === "front" ? "Frente" : "Verso"}
            </div>

            <div className="grid grid-cols-3 grid-rows-4 gap-0">
              {page.cards.map((img, i) => (
                <div
                  key={`${page.type}-${i}`}
                  className={`${cardStyle(page.type)} ${
                    page.type === "front" ? getCardOffset(i) : ""
                  }`}
                  onClick={() => onImageAdd(i, pageIdx)}
                >
                  {/* Número da carta no hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center z-10">
                    <span className="text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {getCardNumber(i, page.type)}
                    </span>
                  </div>

                  {img ? (
                    <img
                      src={img}
                      alt={`${page.type === "front" ? "Frente" : "Verso"} ${
                        i + 1
                      }`}
                      className="w-[90%] h-[90%] object-fill relative z-0"
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-4 relative z-0">
                      <div className="text-lg font-semibold">
                        {page.type === "front" ? "Frente" : "Verso"}{" "}
                        {getCardNumber(i, page.type)}
                      </div>
                      <div className="text-sm mt-2">Clique para adicionar</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-green-600 text-sm">
        <p>Dica: Exporte como PDF para imprimir em tamanho real (100% scale)</p>
        <p>Tamanho das cartas: 63mm × 63mm | Folha A4: 297mm × 210mm</p>
        <p>12 cartas por página (4 fileiras × 3 colunas)</p>
        <p className="mt-2 font-medium">
          Total:{" "}
          {pages
            .filter((p) => p.type === "front")
            .reduce(
              (total, page) => total + page.cards.filter(Boolean).length,
              0,
            )}{" "}
          cartas em {pages.length / 2} páginas
        </p>
      </div>
    </div>
  );
};

// Componente para 4 cartas (81x122)
const FourCardsApp = ({ onImageAdd, pages }) => {
  const cardStyle = (type) =>
    `relative w-[81mm] h-[122mm] bg-white flex items-center justify-center overflow-hidden cursor-pointer group ${
      type === "back" ? "border border-gray-300 border-[0.3px]" : ""
    }`;

  const getCardOffset = (index) => {
    switch (index) {
      case 0:
        return "ml-[5mm] mr-[0mm]";
      case 1:
        return "ml-[2mm] mr-[0mm]";
      case 2:
        return "ml-[5mm] mr-[0mm]";
      case 3:
        return "ml-[2mm] mr-[0mm]";
      default:
        return "";
    }
  };

  const getCardNumber = (index, pageType) => {
    if (pageType === "front") {
      return index + 1;
    } else {
      const row = Math.floor(index / 2);
      const col = index % 2;
      const mirroredCol = 1 - col;
      return row * 2 + mirroredCol + 1;
    }
  };

  return (
    <div className="FourCardsApp">
      <div className="space-y-[20mm]">
        {pages.map((page, pageIdx) => (
          <div
            key={`page-${pageIdx}`}
            className={`four-sheet-${pageIdx} w-[210mm] h-[297mm] bg-white flex justify-center items-center p-[10mm] mx-auto shadow-lg relative`}
            style={
              page.type === "front"
                ? {
                    transform: "rotate(-0.7deg)",
                    transformOrigin: "center center",
                  }
                : {}
            }
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium">
              Página {Math.floor(pageIdx / 2) + 1} -{" "}
              {page.type === "front" ? "Frente" : "Verso"}
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-0">
              {page.cards.map((img, i) => (
                <div
                  key={`${page.type}-${i}`}
                  className={`${cardStyle(page.type)} ${
                    page.type === "front" ? getCardOffset(i) : ""
                  }`}
                  onClick={() => onImageAdd(i, pageIdx)}
                >
                  {/* Número da carta no hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center z-10">
                    <span className="text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {getCardNumber(i, page.type)}
                    </span>
                  </div>

                  {img ? (
                    <img
                      src={img}
                      alt={`${page.type === "front" ? "Frente" : "Verso"} ${
                        i + 1
                      }`}
                      className="w-[90%] h-[90%] object-fill relative z-0"
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-4 relative z-0">
                      <div className="text-lg font-semibold">
                        {page.type === "front" ? "Frente" : "Verso"}{" "}
                        {getCardNumber(i, page.type)}
                      </div>
                      <div className="text-sm mt-2">Clique para adicionar</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-green-600 text-sm">
        <p>Dica: Exporte como PDF para imprimir em tamanho real (100% scale)</p>
        <p>Tamanho das cartas: 81mm × 122mm | Folha A4: 297mm × 210mm</p>
        <p>4 cartas por página (2 fileiras × 2 colunas)</p>
        <p className="mt-2 font-medium">
          Total:{" "}
          {pages
            .filter((p) => p.type === "front")
            .reduce(
              (total, page) => total + page.cards.filter(Boolean).length,
              0,
            )}{" "}
          cartas em {pages.length / 2} páginas
        </p>
      </div>
    </div>
  );
};

// Componente para 16 cartas (40x62)
const SixteenCardsApp = ({ onImageAdd, pages }) => {
  const cardStyle = (type) =>
    `relative w-[40mm] h-[62mm] bg-white flex items-center justify-center overflow-hidden cursor-pointer group ${
      type === "back" ? "border border-gray-300 border-[0.3px]" : ""
    }`;

  const getCardOffset = (index) => {
    switch (index) {
      case 0:
        return "ml-[16mm] mr-[0mm]";
      case 1:
        return "ml-[9mm] mr-[0mm]";
      case 2:
        return "ml-[2mm] mr-[0mm]";
      case 3:
        return "ml-[-5mm] mr-[36mm]";
      case 4:
        return "ml-[16mm] mr-[0mm]";
      case 5:
        return "ml-[9mm] mr-[0mm]";
      case 6:
        return "ml-[2mm] mr-[0mm]";
      case 7:
        return "ml-[-5mm] mr-[36mm]";
      case 8:
        return "ml-[16mm] mr-[0mm]";
      case 9:
        return "ml-[9mm] mr-[0mm]";
      case 10:
        return "ml-[2mm] mr-[0mm]";
      case 11:
        return "ml-[-5mm] mr-[36mm]";
      case 12:
        return "ml-[16mm] mr-[0mm]";
      case 13:
        return "ml-[9mm] mr-[0mm]";
      case 14:
        return "ml-[2mm] mr-[0mm]";
      case 15:
        return "ml-[-5mm] mr-[36mm]";
      default:
        return "";
    }
  };

  const getCardNumber = (index, pageType) => {
    if (pageType === "front") {
      return index + 1;
    } else {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const mirroredCol = 3 - col;
      return row * 4 + mirroredCol + 1;
    }
  };

  return (
    <div className="SixteenCardsApp">
      <div className="space-y-[20mm]">
        {pages.map((page, pageIdx) => (
          <div
            key={`page-${pageIdx}`}
            className={`sixteen-sheet-${pageIdx} w-[210mm] h-[297mm] bg-white flex justify-center items-center p-[10mm] mx-auto shadow-lg relative`}
            style={
              page.type === "front"
                ? {
                    transform: "rotate(-0.7deg)",
                    transformOrigin: "center center",
                  }
                : {}
            }
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium">
              Página {Math.floor(pageIdx / 2) + 1} -{" "}
              {page.type === "front" ? "Frente" : "Verso"}
            </div>

            <div className="grid grid-cols-4 grid-rows-4 gap-0">
              {page.cards.map((img, i) => (
                <div
                  key={`${page.type}-${i}`}
                  className={`${cardStyle(page.type)} ${
                    page.type === "front" ? getCardOffset(i) : ""
                  }`}
                  onClick={() => onImageAdd(i, pageIdx)}
                >
                  {/* Número da carta no hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center z-10">
                    <span className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {getCardNumber(i, page.type)}
                    </span>
                  </div>

                  {img ? (
                    <img
                      src={img}
                      alt={`${page.type === "front" ? "Frente" : "Verso"} ${
                        i + 1
                      }`}
                      className="w-[90%] h-[90%] object-fill relative z-0"
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-2 relative z-0">
                      <div className="text-base font-semibold">
                        {page.type === "front" ? "Frente" : "Verso"}{" "}
                        {getCardNumber(i, page.type)}
                      </div>
                      <div className="text-xs mt-1">Clique para adicionar</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-green-600 text-sm">
        <p>Dica: Exporte como PDF para imprimir em tamanho real (100% scale)</p>
        <p>Tamanho das cartas: 40mm × 62mm | Folha A4: 297mm × 210mm</p>
        <p>16 cartas por página (4 fileiras × 4 colunas)</p>
        <p className="mt-2 font-medium">
          Total:{" "}
          {pages
            .filter((p) => p.type === "front")
            .reduce(
              (total, page) => total + page.cards.filter(Boolean).length,
              0,
            )}{" "}
          cartas em {pages.length / 2} páginas
        </p>
      </div>
    </div>
  );
};

// Componente principal com seletor
function App() {
  const [selectedVersion, setSelectedVersion] = useState("4-cards");
  const [nineCardsPages, setNineCardsPages] = useState([
    { type: "front", cards: Array(9).fill(null) },
    { type: "back", cards: Array(9).fill(null) },
  ]);
  const [twelveCardsPages, setTwelveCardsPages] = useState([
    { type: "front", cards: Array(12).fill(null) },
    { type: "back", cards: Array(12).fill(null) },
  ]);
  const [fourCardsPages, setFourCardsPages] = useState([
    { type: "front", cards: Array(4).fill(null) },
    { type: "back", cards: Array(4).fill(null) },
  ]);
  const [sixteenCardsPages, setSixteenCardsPages] = useState([
    { type: "front", cards: Array(16).fill(null) },
    { type: "back", cards: Array(16).fill(null) },
  ]);

  const currentPages =
    selectedVersion === "4-cards"
      ? fourCardsPages
      : selectedVersion === "9-cards"
        ? nineCardsPages
        : selectedVersion === "12-cards"
          ? twelveCardsPages
          : sixteenCardsPages;

  const setCurrentPages =
    selectedVersion === "4-cards"
      ? setFourCardsPages
      : selectedVersion === "9-cards"
        ? setNineCardsPages
        : selectedVersion === "12-cards"
          ? setTwelveCardsPages
          : setSixteenCardsPages;

  const handleImageClick = (index, pageIndex) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const url = URL.createObjectURL(e.target.files[0]);
      const updatedPages = [...currentPages];
      updatedPages[pageIndex].cards[index] = url;
      setCurrentPages(updatedPages);
    };
    input.click();
  };

  const handleMultipleFronts = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      const updatedPages = [...currentPages];

      files.forEach((file, index) => {
        let frontPageIndex = -1;
        let cardIndexInPage = -1;

        for (let i = 0; i < updatedPages.length; i += 2) {
          if (updatedPages[i].type === "front") {
            const emptySlotIndex = updatedPages[i].cards.findIndex(
              (card) => card === null,
            );
            if (emptySlotIndex !== -1) {
              frontPageIndex = i;
              cardIndexInPage = emptySlotIndex;
              break;
            }
          }
        }

        if (frontPageIndex === -1) {
          let cardCount;
          switch (selectedVersion) {
            case "4-cards":
              cardCount = 4;
              break;
            case "9-cards":
              cardCount = 9;
              break;
            case "12-cards":
              cardCount = 12;
              break;
            case "16-cards":
              cardCount = 16;
              break;
            default:
              cardCount = 4;
          }

          const newFrontPage = {
            type: "front",
            cards: Array(cardCount).fill(null),
          };
          const newBackPage = {
            type: "back",
            cards: Array(cardCount).fill(null),
          };
          updatedPages.push(newFrontPage, newBackPage);
          frontPageIndex = updatedPages.length - 2;
          cardIndexInPage = 0;
        }

        updatedPages[frontPageIndex].cards[cardIndexInPage] =
          URL.createObjectURL(file);
      });

      setCurrentPages(updatedPages);
    };
    input.click();
  };

  const applySingleBack = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const url = URL.createObjectURL(e.target.files[0]);
      let cardCount;
      switch (selectedVersion) {
        case "4-cards":
          cardCount = 4;
          break;
        case "9-cards":
          cardCount = 9;
          break;
        case "12-cards":
          cardCount = 12;
          break;
        case "16-cards":
          cardCount = 16;
          break;
        default:
          cardCount = 4;
      }

      const updatedPages = currentPages.map((page) => {
        if (page.type === "back") {
          return { ...page, cards: Array(cardCount).fill(url) };
        }
        return page;
      });
      setCurrentPages(updatedPages);
    };
    input.click();
  };

  const saveAllPages = async () => {
    let prefix;
    switch (selectedVersion) {
      case "4-cards":
        prefix = "four";
        break;
      case "9-cards":
        prefix = "nine";
        break;
      case "12-cards":
        prefix = "twelve";
        break;
      case "16-cards":
        prefix = "sixteen";
        break;
      default:
        prefix = "four";
    }

    for (let i = 0; i < currentPages.length; i++) {
      const element = document.querySelector(`.${prefix}-sheet-${i}`);
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
        });
        const link = document.createElement("a");

        let sizeLabel;
        switch (selectedVersion) {
          case "4-cards":
            sizeLabel = "4-81x122";
            break;
          case "9-cards":
            sizeLabel = "9-63x88";
            break;
          case "12-cards":
            sizeLabel = "12-63x63";
            break;
          case "16-cards":
            sizeLabel = "16-40x62";
            break;
          default:
            sizeLabel = "4-81x122";
        }

        link.download = `cartas-${sizeLabel}-${
          currentPages[i].type === "front" ? "frente" : "verso"
        }-pagina-${Math.floor(i / 2) + 1}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
      }
    }
  };

  const createPDF = async () => {
    let prefix;
    switch (selectedVersion) {
      case "4-cards":
        prefix = "four";
        break;
      case "9-cards":
        prefix = "nine";
        break;
      case "12-cards":
        prefix = "twelve";
        break;
      case "16-cards":
        prefix = "sixteen";
        break;
      default:
        prefix = "four";
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < currentPages.length; i++) {
      if (i > 0) pdf.addPage();

      const element = document.querySelector(`.${prefix}-sheet-${i}`);
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pageWidth = 210;
        const pageHeight = 297;

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
      }
    }

    let sizeLabel;
    switch (selectedVersion) {
      case "4-cards":
        sizeLabel = "4-81x122";
        break;
      case "9-cards":
        sizeLabel = "9-63x88";
        break;
      case "12-cards":
        sizeLabel = "12-63x63";
        break;
      case "16-cards":
        sizeLabel = "16-40x62";
        break;
      default:
        sizeLabel = "4-81x122";
    }

    pdf.save(`cartas-boardgame-${sizeLabel}.pdf`);
  };

  const clearAllCards = () => {
    if (
      window.confirm(
        "Tem certeza que deseja apagar todas as cartas? Esta ação não pode ser desfeita.",
      )
    ) {
      let cardCount;
      switch (selectedVersion) {
        case "4-cards":
          cardCount = 4;
          break;
        case "9-cards":
          cardCount = 9;
          break;
        case "12-cards":
          cardCount = 12;
          break;
        case "16-cards":
          cardCount = 16;
          break;
        default:
          cardCount = 4;
      }

      setCurrentPages([
        { type: "front", cards: Array(cardCount).fill(null) },
        { type: "back", cards: Array(cardCount).fill(null) },
      ]);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-500">
        Montador de Cartas para Boardgame
      </h1>

      <div className="mb-6 flex flex-wrap justify-center gap-4 bg-black p-4 rounded-lg shadow-lg">
        <button
          onClick={handleMultipleFronts}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow"
        >
          Adicionar Frentes
        </button>

        <button
          onClick={applySingleBack}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow"
        >
          Adicionar Versos
        </button>

        <button
          onClick={saveAllPages}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow"
        >
          Exportar PNGs
        </button>

        <button
          onClick={createPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold shadow"
        >
          Gerar PDF
        </button>

        <button
          onClick={clearAllCards}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-bold shadow"
        >
          Apagar Todas
        </button>

        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          <option value="4-cards">4 Cartas (81×122mm)</option>
          <option value="9-cards">9 Cartas (63×88mm)</option>
          <option value="12-cards">12 Cartas (63×63mm)</option>
          <option value="16-cards">16 Cartas (40×62mm)</option>
        </select>
      </div>

      {selectedVersion === "4-cards" ? (
        <FourCardsApp onImageAdd={handleImageClick} pages={fourCardsPages} />
      ) : selectedVersion === "9-cards" ? (
        <NineCardsApp onImageAdd={handleImageClick} pages={nineCardsPages} />
      ) : selectedVersion === "12-cards" ? (
        <TwelveCardsApp
          onImageAdd={handleImageClick}
          pages={twelveCardsPages}
        />
      ) : (
        <SixteenCardsApp
          onImageAdd={handleImageClick}
          pages={sixteenCardsPages}
        />
      )}
    </div>
  );
}

export default App;
