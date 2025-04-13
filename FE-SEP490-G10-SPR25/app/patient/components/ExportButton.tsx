// components/ExportButton.js
import { useState } from 'react';



const ExportButton = ({ patientId }: {patientId: string | number;}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleExport = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/reports/patients/${patientId}/export`);
            
            if (!response.ok) {
                throw new Error('Xuất báo cáo thất bại');
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `BaoCaoYTe_${patientId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error('Export error:', error);
            if (error instanceof Error) {
                alert('Xuất báo cáo thất bại: ' + error.message);
            } else {
                alert('Xuất báo cáo thất bại: Đã xảy ra lỗi không xác định');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <button 
            onClick={handleExport}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            {isLoading ? 'Đang xuất...' : 'Xuất báo cáo PDF'}
        </button>
    );
};

export default ExportButton;