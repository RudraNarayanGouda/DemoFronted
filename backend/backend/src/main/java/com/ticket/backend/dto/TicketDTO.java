package com.ticket.backend.dto;

import com.ticket.backend.model.Ticket;

public class TicketDTO {
    private Long id;
    private String type;
    private Double price;
    private String status;
    private Long userId;
    private String userName;

    public TicketDTO(Ticket ticket, String userName) {
        this.id = ticket.getId();
        this.type = ticket.getType();
        this.price = ticket.getPrice();
        this.status = ticket.getStatus() != null ? ticket.getStatus().name() : "UNKNOWN";
        this.userId = ticket.getUser() != null ? ticket.getUser().getId() : null;
        this.userName = userName != null ? userName : "Unknown";
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getType() { return type; }
    public Double getPrice() { return price; }
    public String getStatus() { return status; }
    public Long getUserId() { return userId; }
    public String getUserName() { return userName; }

    public void setId(Long id) { this.id = id; }
    public void setType(String type) { this.type = type; }
    public void setPrice(Double price) { this.price = price; }
    public void setStatus(String status) { this.status = status; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setUserName(String userName) { this.userName = userName; }
}