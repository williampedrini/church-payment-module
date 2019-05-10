import '../app.report.module';
import 'sprintf-js';
import '../../../shared/date/service/dateService';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a report.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.report');

    function ReportRestService(dateService, environmentConfig, $httpParamSerializer, REPORT_FORMAT_CATALOG) {

        /**
         * Build the download url campaign report.
         * @private
         */
        function _buildDownloadUrlCampaignReport() {
            var params = {
                fileName: 'campanhas',
                format: REPORT_FORMAT_CATALOG[0].value
            };
            return _buildUrl("campaign", params);
        }

        /**
         * Build the download url celebration report.
         *
         * @param {Array} contributors
         *         The resources to be used for filling the reports.
         * @param {String} celebration
         *         The type of the celebration (optional)
         * @param {Date} beginDate
         *         The begging date of a range to be used for filtering by celebration. (optional)
         * @param {Date} endDate
         *         The ending date of a range to be used for filtering by celebration. (optional)
         * @private
         */
        function _buildDownloadUrlCelebrationReport(contributors, celebration, beginDate, endDate) {
            var params = {
                celebration: celebration,
                beginDate: beginDate,
                endDate: endDate,
                fileName: 'celebracoes',
                format: REPORT_FORMAT_CATALOG[0].value
            };
            dateService.convertParamDates(params);
            return _buildDownloadUrlBySource("celebration", params, contributors);
        }

        /**
         * Build the download url contribution report by contributor.
         *
         * @param {Array} contributors
         *         The resources to be used for filling the reports.
         * @private
         */
        function _buildDownloadUrlContributionByContributorReport(contributors) {
            var params = {
                fileName: 'contribuicoes'
            };
            return _buildDownloadUrlBySource("contribution_by_contributor", params, contributors);
        }

        /**
         * Build the download url contribution report.
         * @param {number} contributions
         *         The resources to be used for filling the reports.
         * @private
         */
        function _buildDownloadUrlContributionReport(contributions) {
            var params = {
                fileName: 'contribuicoes',
                format: REPORT_FORMAT_CATALOG[0].value
            };
            return _buildDownloadUrlBySource("contribution", params, contributions);
        }

        /**
         * Build the download url tag report.
         * @param {number} contributors
         *         The resources to be used for filling the reports.
         * @private
         */
        function _buildDownloadUrlTagReport(contributors) {
            var params = {
                fileName: 'etiquetas',
                format: REPORT_FORMAT_CATALOG[0].value
            };
            return _buildDownloadUrlBySource("tag", params, contributors);
        }

        /**
         * Build a URL based on a builder, a default file name and a list of sources.
         * @param type {String} The type of the report to be generated.
         * @param params {Object} The query parameters used to fill the url.
         * @param sources {Array} A list of a source used to populate the report.
         * @returns {*} The built URL.
         * @private
         */
        function _buildDownloadUrlBySource(type, params, sources) {
            var ids = sources.map(function(source) {
                return source.id;
            });
            if(ids.length === 1) {
                // If the enforced format is not defined, then it will use the PDF format.
                params.format = !!params.format ? params.format : REPORT_FORMAT_CATALOG[0].value;
            } else {
                // If the enforced format is not defined, then it will use the Zip format.
                params.format = !!params.format ? params.format : REPORT_FORMAT_CATALOG[1].value;
            }
            params.ids = ids;
            return _buildUrl(type, params);
        }

        /**
         * Build the url based on a base url.
         * @param type The type of the report.
         * @param params The params to be used as query param.
         * @returns {string} The built url.
         * @private
         */
        function _buildUrl(type, params) {
            return environmentConfig.apiBaseUrl + "/reports/" + type + "/download?" + $httpParamSerializer(params);
        }

        return {
            buildDownloadUrlTagReport: _buildDownloadUrlTagReport,
            buildDownloadUrlCampaignReport: _buildDownloadUrlCampaignReport,
            buildDownloadUrlCelebrationReport: _buildDownloadUrlCelebrationReport,
            buildDownloadUrlContributionReport: _buildDownloadUrlContributionReport,
            buildDownloadUrlContributionByContributorReport: _buildDownloadUrlContributionByContributorReport
        }
    }
    module.service('reportRestService', [
        'dateService',
        'environmentConfig',
        '$httpParamSerializer',
        'REPORT_FORMAT_CATALOG',
        ReportRestService
    ]);
}());