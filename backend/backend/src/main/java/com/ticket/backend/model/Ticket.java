package com.ticket.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String source;
    private String destination;
    private String date;
    private Double price;

    @Enumerated(EnumType.STRING)
    private TicketStatus status = TicketStatus.OPEN;

    // ✅ FIX: infinite loop solve
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"tickets"}) 
    private User user;

    @Column(name = "ticket_type")
    private String type;

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}