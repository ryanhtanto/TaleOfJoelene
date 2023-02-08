import React from 'react';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function PrintCard({ orders }) {    
        const pdfExportComponent = React.useRef(null);
        const exportPDFWithComponent = () => {
                if (pdfExportComponent.current) {
                        pdfExportComponent.current.save();
                }
        };
        return(
                <>
                        <button type="button" className="btn btn-info"  onClick={exportPDFWithComponent}>Convert PDF</button>
                        <PDFExport
                                ref={pdfExportComponent}
                                paperSize="auto"
                                margin={40}
                                fileName={`Customer Data`}
                                author="Tale of Joelene"
                        >
                                <div className="row mt-5 mb-5 mx-auto">
                                        {
                                                orders.map((order) => (
                                                        <div className="col-md-12 col-lg-6 mb-3">
                                                                <div className="card" >
                                                                        <div className="card-body">
                                                                                <h5 className="card-title">Pengirim</h5>
                                                                                <p className='m-0'>Nama: Tale of Jeoelene</p>
                                                                                <p className='mt-0'>No. HP: 0812345678</p>
                                                                                <h5 className="card-title">Penerima</h5>
                                                                                <p className='m-0'>Nama: {order.name}</p>
                                                                                <p className='m-0'>No. HP: {order.nomor}</p>
                                                                                <p className='mt-0'>Alamat: {order.address}</p>
                                                                                <p className='m-0'>Jenis Pengiriman: {order.pengiriman}</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))
                                        }
                                </div>
                        </PDFExport>
                        
                </>
        )       
}

export default PrintCard;