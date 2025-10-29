import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Componente para 9 cartas
const NineCardsApp = ({ onImageAdd, pages }) => {
  const cardStyle = (type) =>
    `relative w-[63mm] h-[88mm] bg-white flex items-center justify-center overflow-hidden cursor-pointer ${
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
                  {img ? (
                    <img
                      src={img}
                      alt={`${page.type === "front" ? "Frente" : "Verso"} ${
                        i + 1
                      }`}
                      className="w-[90%] h-[90%] object-fill"
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-4">
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
              0
            )}{" "}
          cartas em {pages.length / 2} páginas
        </p>
      </div>
    </div>
  );
};

// Componente para 12 cartas
const TwelveCardsApp = ({ onImageAdd, pages }) => {
  const cardStyle = (type) =>
    `relative w-[63mm] h-[63mm] bg-white flex items-center justify-center overflow-hidden cursor-pointer ${
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
                  {img ? (
                    <img
                      src={img}
                      alt={`${page.type === "front" ? "Frente" : "Verso"} ${
                        i + 1
                      }`}
                      className="w-[90%] h-[90%] object-fill"
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-4">
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
              0
            )}{" "}
          cartas em {pages.length / 2} páginas
        </p>
      </div>
    </div>
  );
};

// Componente principal com seletor
function App() {
  const [selectedVersion, setSelectedVersion] = useState("9-cards");
  const [nineCardsPages, setNineCardsPages] = useState([
    { type: "front", cards: Array(9).fill(null) },
    { type: "back", cards: Array(9).fill(null) },
  ]);
  const [twelveCardsPages, setTwelveCardsPages] = useState([
    { type: "front", cards: Array(12).fill(null) },
    { type: "back", cards: Array(12).fill(null) },
  ]);

  const currentPages =
    selectedVersion === "9-cards" ? nineCardsPages : twelveCardsPages;
  const setCurrentPages =
    selectedVersion === "9-cards" ? setNineCardsPages : setTwelveCardsPages;

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
              (card) => card === null
            );
            if (emptySlotIndex !== -1) {
              frontPageIndex = i;
              cardIndexInPage = emptySlotIndex;
              break;
            }
          }
        }

        if (frontPageIndex === -1) {
          const cardCount = selectedVersion === "9-cards" ? 9 : 12;
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
      const cardCount = selectedVersion === "9-cards" ? 9 : 12;
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
    const prefix = selectedVersion === "9-cards" ? "nine" : "twelve";

    for (let i = 0; i < currentPages.length; i++) {
      const element = document.querySelector(`.${prefix}-sheet-${i}`);
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
        });
        const link = document.createElement("a");
        link.download = `cartas-${selectedVersion === "9-cards" ? "9" : "12"}-${
          currentPages[i].type === "front" ? "frente" : "verso"
        }-pagina-${Math.floor(i / 2) + 1}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
      }
    }
  };

  const createPDF = async () => {
    const prefix = selectedVersion === "9-cards" ? "nine" : "twelve";
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

    pdf.save(
      `cartas-boardgame-${selectedVersion === "9-cards" ? "9" : "12"}.pdf`
    );
  };

  const clearAllCards = () => {
    if (
      window.confirm(
        "Tem certeza que deseja apagar todas as cartas? Esta ação não pode ser desfeita."
      )
    ) {
      const cardCount = selectedVersion === "9-cards" ? 9 : 12;
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
          <option value="9-cards">9 Cartas</option>
          <option value="12-cards">12 Cartas</option>
        </select>
      </div>

      {selectedVersion === "9-cards" ? (
        <NineCardsApp onImageAdd={handleImageClick} pages={nineCardsPages} />
      ) : (
        <TwelveCardsApp
          onImageAdd={handleImageClick}
          pages={twelveCardsPages}
        />
      )}
    </div>
  );
}

export default App;
