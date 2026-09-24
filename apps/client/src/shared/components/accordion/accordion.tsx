import { createContext, MouseEventHandler, ReactNode, useContext } from 'react';

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

interface AccordionItemProps extends AccordionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface AccordionTriggerAttributes {
  type: 'button';
  'data-state': 'open' | 'closed';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface AccordionTriggerProps {
  children: ReactNode | ((props: AccordionTriggerAttributes) => ReactNode);
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface AccordionContextValue {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === null) {
    throw new Error(
      'useAccordion는 <Accordion.Item> 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};

const Accordion = ({ children, className }: AccordionProps) => (
  <div className={className}>{children}</div>
);

const AccordionItem = ({
  children,
  className,
  isOpen,
  onOpenChange,
}: AccordionItemProps) => {
  return (
    <AccordionContext.Provider
      value={{
        isOpen,
        onOpenChange,
      }}
    >
      <div className={className} data-state={isOpen ? 'open' : 'closed'}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionTrigger = ({
  children,
  className,
  onClick,
}: AccordionTriggerProps) => {
  const { isOpen, onOpenChange } = useAccordion();

  const toggleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      onOpenChange(!isOpen);
    }
  };

  const triggerProps: AccordionTriggerAttributes = {
    type: 'button',
    'data-state': isOpen ? 'open' : 'closed',
    onClick: toggleOpen,
  };

  if (typeof children === 'function') {
    return children(triggerProps);
  }

  return (
    <button {...triggerProps} className={className}>
      {children}
    </button>
  );
};

const AccordionContent = ({ children, className }: AccordionProps) => {
  const { isOpen } = useAccordion();

  return (
    <div
      className={className}
      data-state={isOpen ? 'open' : 'closed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
