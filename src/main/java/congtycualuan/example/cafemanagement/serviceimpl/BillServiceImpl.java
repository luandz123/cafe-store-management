// src/main/java/congtycualuan/example/cafemanagement/serviceimpl/BillServiceImpl.java
package congtycualuan.example.cafemanagement.serviceimpl;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;

import congtycualuan.example.cafemanagement.model.Bill;
import congtycualuan.example.cafemanagement.repository.BillRepository;
import congtycualuan.example.cafemanagement.service.BillService;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public List<Bill> getAllBills() {
        log.info("Fetching all bills");
        return billRepository.findAll();
    }

    @Override
    public Bill createBill(Bill bill) {
        log.info("Creating bill: {}", bill);
        return billRepository.save(bill);
    }

    @Override
    public Optional<Bill> getBillById(Integer id) {
        log.info("Fetching bill by ID: {}", id);
        return billRepository.findById(id);
    }

    @Override
    public void deleteBillById(Integer id) {
        log.info("Deleting bill by ID: {}", id);
        billRepository.deleteById(id);
    }

    @Override
    public byte[] generateReport(Integer id) {
        log.info("Generating report for bill ID: {}", id);
        Optional<Bill> optionalBill = billRepository.findById(id);
        if (!optionalBill.isPresent()) {
            log.warn("Bill not found for ID: {}", id);
            return new byte[0];
        }

        Bill bill = optionalBill.get();
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Define table structure
            float[] columnWidths = {50F, 100F, 100F, 100F, 100F, 100F, 100F, 150F, 100F};
            Table table = new Table(columnWidths);
            table.addHeaderCell("ID");
            table.addHeaderCell("UUID");
            table.addHeaderCell("Name");
            table.addHeaderCell("Email");
            table.addHeaderCell("Phone");
            table.addHeaderCell("Payment Method");
            table.addHeaderCell("Total");
            table.addHeaderCell("Product Detail");
            table.addHeaderCell("Created By");

            // Populate table with bill data
            table.addCell(bill.getId().toString());
            table.addCell(bill.getUuid());
            table.addCell(bill.getName());
            table.addCell(bill.getEmail());
            table.addCell(bill.getPhone());
            table.addCell(bill.getPaymentMethod());
            table.addCell(bill.getTotal());
            table.addCell(bill.getProductDetail());
            table.addCell(bill.getCreatedBy());

            // Add table to document
            document.add(table);

            // Close document
            document.close();

            log.info("Report generated successfully for bill ID: {}", id);
            return baos.toByteArray();
        } catch (Exception e) {
            log.error("Error generating report for bill ID {}: {}", id, e.getMessage());
            return new byte[0];
        }
    }

    @Override
    public long getBillCount() {
        log.info("Fetching total number of bills");
        return billRepository.count();
    }
}