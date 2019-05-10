package br.com.payment.management.webapp.report.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequest {
    private List<Long> ids;
    private String fileName;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate initialDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate finalDate;
}