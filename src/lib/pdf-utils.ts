import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PDFSection {
	title: string;
	data: Record<string, unknown>[];
	columns: string[];
}

interface PDFOptions {
	title: string;
	subtitle?: string;
	sections: PDFSection[];
}

export function generatePDF(options: PDFOptions) {
	const doc = new jsPDF();
	let yPosition = 20;

	// Add title
	doc.setFontSize(20);
	doc.text(options.title, 20, yPosition);
	yPosition += 10;

	// Add subtitle if provided
	if (options.subtitle) {
		doc.setFontSize(12);
		doc.setTextColor(100, 100, 100);
		doc.text(options.subtitle, 20, yPosition);
		doc.setTextColor(0, 0, 0);
		yPosition += 15;
	} else {
		yPosition += 10;
	}

	// Add timestamp
	doc.setFontSize(10);
	doc.setTextColor(150, 150, 150);
	doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, yPosition);
	doc.setTextColor(0, 0, 0);
	yPosition += 15;

	// Add each section
	options.sections.forEach((section, index) => {
		// Add section title
		doc.setFontSize(14);
		doc.text(section.title, 20, yPosition);
		yPosition += 10;

		// Prepare table data
		const tableData = section.data.map((row) => {
			return section.columns.map((col) => {
				const key = col.toLowerCase().replace(/\s+/g, "");
				const value = row[key] || row[col.toLowerCase()] || "";

				// Format numbers with thousand separators
				if (typeof value === "number") {
					return value.toLocaleString();
				}
				return value;
			});
		});

		// Add table
		autoTable(doc, {
			head: [section.columns],
			body: tableData,
			startY: yPosition,
			theme: "striped",
			headStyles: {
				fillColor: [59, 130, 246],
				textColor: 255,
				fontSize: 11,
			},
			bodyStyles: {
				fontSize: 10,
			},
			alternateRowStyles: {
				fillColor: [248, 250, 252],
			},
			margin: { left: 20, right: 20 },
		});

		// Update Y position for next section
		yPosition = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20;

		// Add page break if needed
		if (yPosition > 250 && index < options.sections.length - 1) {
			doc.addPage();
			yPosition = 20;
		}
	});

	// Save the PDF
	doc.save(`${options.title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
