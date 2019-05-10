package br.com.payment.management.core.report.service;

import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.enumerable.ValidatorError;
import br.com.payment.management.core.report.model.Criteria;
import br.com.payment.management.core.report.model.ReportFile;
import br.com.payment.management.core.report.model.ReportFormat;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.swing.NaiveUserAgent;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import no.api.freemarker.java8.Java8ObjectWrapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.io.*;
import java.net.URL;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Class responsible for defining all the exposed methods that a document generator service must provide.
 *
 * @author William Custodio
 */
public abstract class ReportGeneratorService {

    final static DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy_HHmmssSSS");

    @Autowired
    private Configuration freemarker;

    @PostConstruct
    public void postConstruct() {
        this.freemarker.setObjectWrapper(new Java8ObjectWrapper(Configuration.getVersion()));
    }

    /**
     * Generates a document based on a template defined by a {@link GeneratorType}.
     * @param criteria The criteria used to retrieve the data used to generate the document.
     * @return The representation of the generated document.
     */
    public ReportFile generate(final Criteria criteria) {
        try {
            final ReportFile.ReportFileBuilder reportBuilder = ReportFile.builder().name(this.buildFileName(criteria));
            if(this.isZipFileGeneration(criteria)) {
                final byte[] zip = this.generateZipFile(criteria);
                return reportBuilder.content(zip).build();
            }
            final byte[] pdf = this.generatePdfFile(criteria);
            return reportBuilder.content(pdf).build();
        } catch (final Exception exception) {
            throw new BusinessException(ValidatorError.UNKNOWN_ERROR.getKey(), exception.getLocalizedMessage());
        }
    }

    /**
     * Retrieves the type of the service according to the defining done by the  {@link GeneratorType}
     * @return The defined type.
     */
    abstract GeneratorType getType();

    /**
     * Retrieves the data used to build the final HTML document.
     * @param criteria The criteria used to retrieve the data used to generate the document.
     * @return The found data.
     */
    abstract Map<String, Object> getData(Criteria criteria);

    /**
     * Retrieves a default name of the file by a specific resource identifier.
     * @param criteria The criteria used to build the name.
     * @return The generate file name.
     */
    abstract String getDefaultFileName(Criteria criteria);

    /**
     * Build the report's file name.
     * @param criteria The criteria with the information to be used to build the name.
     * @return The name
     */
    private String buildFileName(final Criteria criteria) {
        final String template = "%s." + criteria.getFormat().name().toLowerCase();
        return Optional.ofNullable(String.format(template, criteria.getFileName()))
                .orElse(String.format(template, this.getDefaultFileName(criteria)));
    }

    /**
     * Generates the template file as zip file.
     * @param baseCriteria The base criteria used to retrieve the data used to generate the document.
     * @return The zip file.
     */
    private byte[] generateZipFile(final Criteria baseCriteria) throws Exception {

        try(final ByteArrayOutputStream fileOutputStream = new ByteArrayOutputStream();
            final BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream)) {

            try(final ZipOutputStream zipOutputStream = new ZipOutputStream(bufferedOutputStream)) {
                for(final Long id : baseCriteria.getIds()) {

                    final Criteria criteria = baseCriteria.toBuilder().ids(Collections.singletonList(id)).build();

                    final ZipEntry zipEntry = new ZipEntry(this.getDefaultFileName(criteria));
                    zipOutputStream.putNextEntry(zipEntry);

                    final byte[] file = this.generatePdfFile(criteria);
                    zipOutputStream.write(file);

                    zipOutputStream.flush();
                }
            }

            return fileOutputStream.toByteArray();
        }
    }

    /**
     * Generates the template file as pdf file.
     * @param criteria The base criteria used to retrieve the data used to generate the document.
     * @return The report in pdf format.
     */
    private byte[] generatePdfFile(final Criteria criteria) throws Exception {
        final String html = this.getTemplateAsHtml(this.getData(criteria));
        return this.getHtmlAsPdf(html);
    }

    /**
     * Verifies whether the template will be generated as a zip file or not.
     * @return <code>true: </code> The template will be generate as zip file. </br>
     *         <code>false: </code> The template will not be generate as zip file.
     */
    private boolean isZipFileGeneration(final Criteria criteria) {
        return Objects.nonNull(criteria) && ReportFormat.ZIP.equals(criteria.getFormat());
    }

    /**
     * Generates a HTML representation of a certain freemarker template.
     * @param data The data used to fill out the template.
     * @return The converted template into HTML.
     * @throws IOException Error while reading the template file.
     * @throws TemplateException Error while generating the final template file.
     */
    private String getTemplateAsHtml(final Map<String, Object> data) throws IOException, TemplateException {
        try(final Writer writer = new StringWriter()) {
            final String templateFileName = this.getType().getTemplate();
            this.freemarker.getTemplate(templateFileName).process(data, writer);
            return writer.toString();
        }
    }

    /**
     * Generates a document as PDF based on a HTML document.
     * @param html The html to be converted into a PDF.
     * @return The converted document as PDF.
     * @throws Exception Error while converting the document into PDF.
     */
    private byte[] getHtmlAsPdf(final String html) throws Exception {
        try(final ByteArrayOutputStream file = new ByteArrayOutputStream()) {
            final PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, "");
            builder.toStream(file);
            builder.useUriResolver(new NaiveUserAgent.DefaultUriResolver() {
                @Override
                public String resolveURI(String baseUri, String uri) {
                    if (!uri.startsWith("/")) {
                        URL resource = this.getClass().getResource(uri);
                        if (resource != null)
                            return resource.toString();
                        resource = this.getClass().getResource(baseUri + "/" + uri);
                        if (resource != null)
                            return resource.toString();
                    }
                    return super.resolveURI(baseUri, uri);
                }
            });
            builder.run();
            return file.toByteArray();
        }
    }
}