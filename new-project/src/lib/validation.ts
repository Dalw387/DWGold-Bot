import {
  TONES,
  emptyGeneratorValues,
  type FieldErrors,
  type GeneratorFormValues,
  type Tone,
  type ToolSlug,
} from "@/lib/types";

const LIMITS = {
  businessName: { min: 2, max: 80 },
  businessType: { min: 2, max: 80 },
  location: { min: 2, max: 80 },
  offer: { min: 2, max: 220 },
  callToAction: { max: 140 },
} as const;

export function isTone(value: string): value is Tone {
  return (TONES as readonly string[]).includes(value);
}

export function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function lengthError(
  label: string,
  value: string,
  min: number | undefined,
  max: number,
): string | undefined {
  if (min !== undefined && value.length < min) {
    return `${label} must be at least ${min} characters.`;
  }
  if (value.length > max) {
    return `${label} must be ${max} characters or fewer.`;
  }
  return undefined;
}

export function validateGeneratorForm(
  values: GeneratorFormValues,
  slug: ToolSlug,
): FieldErrors {
  const errors: FieldErrors = {};
  const businessName = compactText(values.businessName);
  const businessType = compactText(values.businessType);
  const location = compactText(values.location);
  const offer = compactText(values.offer);
  const callToAction = compactText(values.callToAction);

  if (!businessName) {
    errors.businessName = "Enter the business name.";
  } else {
    const error = lengthError(
      "Business name",
      businessName,
      LIMITS.businessName.min,
      LIMITS.businessName.max,
    );
    if (error) errors.businessName = error;
  }

  if (!businessType) {
    errors.businessType = "Enter the type of business.";
  } else {
    const error = lengthError(
      "Business type",
      businessType,
      LIMITS.businessType.min,
      LIMITS.businessType.max,
    );
    if (error) errors.businessType = error;
  }

  if (!location) {
    errors.location = "Enter a town, city, or service area.";
  } else {
    const error = lengthError(
      "Location",
      location,
      LIMITS.location.min,
      LIMITS.location.max,
    );
    if (error) errors.location = error;
  }

  if (!offer) {
    errors.offer =
      slug === "notice"
        ? "Enter the notice, change, or reminder."
        : "Enter a product, service, offer, or promotion.";
  } else {
    const error = lengthError("This field", offer, LIMITS.offer.min, LIMITS.offer.max);
    if (error) errors.offer = error;
  }

  if (!isTone(values.tone)) {
    errors.tone = "Choose a tone.";
  }

  if (callToAction) {
    const error = lengthError(
      "Call to action",
      callToAction,
      undefined,
      LIMITS.callToAction.max,
    );
    if (error) errors.callToAction = error;
  }

  if (slug === "facebook-post-generator" && values.facebookStyles.length === 0) {
    errors.facebookStyles = "Choose at least one post style.";
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function sanitiseFormValues(values: GeneratorFormValues): GeneratorFormValues {
  return {
    ...values,
    businessName: compactText(values.businessName),
    businessType: compactText(values.businessType),
    location: compactText(values.location),
    offer: compactText(values.offer),
    callToAction: compactText(values.callToAction),
    facebookStyles: [...values.facebookStyles],
  };
}

export { emptyGeneratorValues };
