/**
 * Utility functions for exporting data to CSV and generating PDF reports
 */

// Helper to escape and format CSV fields
function formatCSVField(val: any): string {
  if (val === null || val === undefined) return '""';
  if (Array.isArray(val)) {
    return `"${val.join(', ').replace(/"/g, '""')}"`;
  }
  if (typeof val === 'boolean') {
    return val ? '"Oui"' : '"Non"';
  }
  const str = String(val);
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Exports an array of objects into a properly formatted UTF-8 CSV with BOM for Excel compatibility
 */
export function exportTableToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columnMapping?: Record<string, string>
) {
  if (!data || data.length === 0) {
    alert('Aucune donnée à exporter.');
    return;
  }

  // Get keys
  const keys = Object.keys(data[0]);

  // Headers in French if mapping provided
  const headers = keys.map((key) => {
    if (columnMapping && columnMapping[key]) {
      return formatCSVField(columnMapping[key]);
    }
    return formatCSVField(key);
  });

  // Rows
  const rows = data.map((item) => {
    return keys.map((key) => formatCSVField(item[key])).join(';');
  });

  // UTF-8 BOM for Microsoft Excel compatibility
  const BOM = '\uFEFF';
  const csvContent = BOM + [headers.join(';'), ...rows].join('\r\n');

  // Trigger browser download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers a high quality PDF print/download dialog for the specified DOM element
 */
export function exportElementToPDF(elementId: string, documentTitle: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  // Temporarily set document title so the PDF saves with this name
  const originalTitle = document.title;
  document.title = documentTitle;

  // Trigger print dialog where users can select "Save as PDF" / "Enregistrer au format PDF"
  window.print();

  // Restore title
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}
