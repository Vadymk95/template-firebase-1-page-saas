import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FeedbackForm } from '@/components/features/FeedbackForm';
import { Card } from '@/components/ui/card';
import { FEEDBACK_SOURCES } from '@/constants/feedback';
import { DEFAULT_NAMESPACE } from '@/lib/i18n/constants';

const HOME_NAMESPACE = 'home';

export const HomePage: FC = () => {
    const { t } = useTranslation([DEFAULT_NAMESPACE, HOME_NAMESPACE]);

    return (
        <div className="flex flex-col items-center gap-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold mb-2">{t('home:title')}</h1>
                <p className="text-muted-foreground">{t('home:description')}</p>
            </header>

            <div className="w-full max-w-xl border-t py-12">
                <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                        {t('home:feedback.title')}
                    </h2>
                    <p className="text-muted-foreground">{t('home:feedback.description')}</p>
                    <Card className="p-6 text-left">
                        <FeedbackForm source={FEEDBACK_SOURCES.FOOTER} />
                    </Card>
                </div>
            </div>
        </div>
    );
};
