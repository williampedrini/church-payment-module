package br.com.payment.management.webapp.report.controller;

import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.model.Criteria;
import br.com.payment.management.core.report.model.ReportFile;
import br.com.payment.management.core.report.service.ReportGeneratorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/reports")
public class ReportController {

    private ReportGeneratorFactory documentGeneratorFactory;

    @Autowired
    public ReportController(final ReportGeneratorFactory documentGeneratorFactory) {
        this.documentGeneratorFactory = documentGeneratorFactory;
    }

    @GetMapping(path = "/{type}/download")
    public ResponseEntity<Resource> downloadDocumentByType(@PathVariable final String type, final Criteria criteria) {
        final ReportFile reportFile = this.documentGeneratorFactory
                .getDocumentGeneratorService(GeneratorType.valueOf(type.toUpperCase()))
                .generate(criteria);
        return this.buildResponseForDownload(reportFile);
    }

    private ResponseEntity<Resource> buildResponseForDownload(final ReportFile document) {
        return ResponseEntity.ok()
                .header("Content-Disposition", String.format("attachment; filename=\"%s\"", document.getName()))
                .contentLength(document.getContent().length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new ByteArrayResource(document.getContent()));
    }
}