package com.ticket.backend.controller;

import com.ticket.backend.model.Ticket;
import com.ticket.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    // CREATE
    @PostMapping
    public Ticket createTicket(@RequestParam Long userId, @RequestBody Ticket ticket) {
        if (ticket.getType() == null || ticket.getType().isEmpty()) {
            ticket.setType("Unknown");
        }
        return ticketService.createTicket(userId, ticket);
    }
     @GetMapping(path = "")
public List<Ticket> getAllTickets() {
    return ticketService.getAllTickets();
}

    // GET ALL USER TICKETS
    @GetMapping("/user/{userId}")
    public List<Ticket> getUserTickets(@PathVariable Long userId) {
        return ticketService.getUserTickets(userId);
    }
   
    // ✅ GET BY ID (PDF FIX)
    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @GetMapping("/admin")
public List<com.ticket.backend.dto.TicketDTO> getAllTicketsForAdmin() {
    return ticketService.getAllTicketsDTO();
}
    // UPDATE
    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket ticket) {
        if (ticket.getType() == null || ticket.getType().isEmpty()) {
            ticket.setType("Unknown");
        }
        return ticketService.updateTicket(id, ticket);
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public Ticket updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ticketService.updateStatus(id, status);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}