import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { CategoriesPage } from "@/pages/categories";
import { categoriesApi } from "@/shared/api/categories";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(CategoriesPage, DefaultLayout);

export default CategoriesPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const categories = await categoriesApi.getCategories({
      headers: ctx.req.headers,
    });

    ctx.req.__CATEGORIES__ = categories;

    const initialState = StateBuilder.Init(ctx)
      .setBaseData()
      .setCategories()
      .build();

    return { props: { initialState } };
  }
);
