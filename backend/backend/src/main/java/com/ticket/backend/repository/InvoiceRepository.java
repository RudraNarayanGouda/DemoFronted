package com.ticket.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticket.backend.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}