import PDFDoument from 'pdfkit';
import fs from 'fs';
import { url } from 'inspector';

function generateTicket({booking,trip, user,res}){
    const doc = new PDFDoument();
   res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${booking._id}.pdf`);
  
    doc.pipe(res);

    doc.fontSize(20).text('Booking Confirmation', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Booking ID: ${booking._id}`);
    doc.text(`User: ${user.name} (${user.email})`);
    doc.text(`Trip: ${trip.title} in ${trip.location} on ${trip.date}`);
    doc.text(`Status: ${booking.status}`);
  
    doc.text(`Total Price: $${booking.totalPrice}`);
    doc.text(
      `Booking Date: ${new Date(booking.createdAt).toLocaleDateString()}`
    );
    doc.moveDown();
    doc.text('Thank you for booking with us!', { align: 'center' });

    doc.end();
  
}
export default generateTicket;