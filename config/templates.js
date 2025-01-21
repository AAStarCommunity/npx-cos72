const TEMPLATE_MAP = {
  default: 'github:cos72-team/template-default',
  vue: 'github:cos72-team/template-vue',
  react: 'github:cos72-team/template-react'
};

/**
 * Validates if the template exists in configuration
 * @param {string} template - Template name to validate
 * @returns {boolean} - Whether template exists
 */
function validateTemplate(template) {
  return template in TEMPLATE_MAP;
}

/**
 * Get template repository URL
 * @param {string} template - Template name
 * @returns {string} - Repository URL
 */
function getTemplateRepo(template) {
  return TEMPLATE_MAP[template] || TEMPLATE_MAP.default;
}

module.exports = {
  TEMPLATE_MAP,
  validateTemplate,
  getTemplateRepo
}; 