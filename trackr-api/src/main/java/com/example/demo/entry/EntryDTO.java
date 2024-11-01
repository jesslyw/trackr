package com.example.demo.entry;

import com.example.demo.status.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for Entry
 * This is used to transfer data during an API response,
 * representing an Entry while obscuring its lastChanged field
 */
@Getter
@Setter
@NoArgsConstructor
public class EntryDTO {
    private UUID id;
    private String name;
    private LocalDate date;
    private String note;
    private Status status;
}
