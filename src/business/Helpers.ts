import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const route = async (to: string, router: AppRouterInstance) => {
  const env = process.env.NODE_ENV;
  if (env === "development") router.push(to);
  else {
    document.location.href = to;
  }
};

export { route };
