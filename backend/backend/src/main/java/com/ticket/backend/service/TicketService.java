package com.ticket.backend.service;

import com.ticket.backend.dto.TicketDTO;
import com.ticket.backend.model.Ticket;
import com.ticket.backend.model.TicketStatus;
import com.ticket.backend.model.User;
import com.ticket.backend.repository.TicketRepository;
import com.ticket.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    public Ticket createTicket(Long userId, Ticket ticket) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        ticket.setUser(user);
        ticket.setStatus(TicketStatus.OPEN);

        if(ticket.getPrice() == null){
        ticket.setPrice(0.0);
    }
        // Ensure type
        if(ticket.getType() == null || ticket.getType().isEmpty()) {
            ticket.setType("Unknown");
        }

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
    return ticketRepository.findAll();
}

    public List<TicketDTO> getAllTicketsDTO() {
    List<Ticket> tickets = ticketRepository.findAll();

    return tickets.stream().map(t -> {
        String name = "Unknown";
        if (t.getUser() != null) {
            name = t.getUser().getName();
        }
        return new com.ticket.backend.dto.TicketDTO(t, name);
    }).toList();
}
    // GET BY USER
    public List<Ticket> getUserTickets(Long userId) {
        return ticketRepository.findByUserId(userId);
    }

    public Ticket getTicketById(Long id) {
    return ticketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
}

    // UPDATE
    public Ticket updateTicket(Long id, Ticket updated) {
    Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ticket not found"));

    ticket.setSource(updated.getSource());
    ticket.setDestination(updated.getDestination());
    ticket.setDate(updated.getDate());
    ticket.setPrice(updated.getPrice());

    // ✅ FIX TYPE
    if (updated.getType() == null || updated.getType().isEmpty()) {
        ticket.setType("Unknown");
    } else {
        ticket.setType(updated.getType());
    }

    if(updated.getPrice() == null){
    ticket.setPrice(0.0);
} else {
    ticket.setPrice(updated.getPrice());
}

    return ticketRepository.save(ticket);
}

    // UPDATE STATUS
    public Ticket updateStatus(Long id, String status) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(TicketStatus.valueOf(status.toUpperCase()));
        return ticketRepository.save(ticket);
    }

    // DELETE
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}