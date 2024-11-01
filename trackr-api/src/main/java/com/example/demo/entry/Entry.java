package com.example.demo.entry;
import com.example.demo.status.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Entry {
    @Id
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private LocalDate date;
    private String note;
    @ManyToOne
    @JoinColumn(name = "status_id" , nullable = false)
    @NotNull
    private Status status;
    private LocalDateTime lastChanged; // not exposed
    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        this.lastChanged = LocalDateTime.now();
    }
}

